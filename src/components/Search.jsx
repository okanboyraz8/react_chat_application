import React, { useState, useContext } from 'react'
import { db } from '../firebase/config'
import { collection, query, where, getDocs, getDoc, doc, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

export default function Search() {

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const {dispatch} = useContext(ChatContext); 

  const { loginUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", searchUser));

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        setUser(doc.data())
      })
    } catch (error) {
      setError(error)      
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    
    const mergedId = loginUser.uid > user.uid ? loginUser.uid + user.uid : user.uid + loginUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", mergedId));

      if(!res.exists()){
        await setDoc(doc(db, "chats", mergedId), {messages: []})

        await updateDoc(doc(db, "usersChats", loginUser.uid), {
          [mergedId + ".userInfo"]:{
            uid: user.uid,
            username: user.username,
            photoURL: user.photoURL
          },
          [mergedId + ".date"]:serverTimestamp()
        });

        await updateDoc(doc(db, "usersChats", user.uid), {
          [mergedId + ".userInfo"]:{
            uid: loginUser.uid,
            username: loginUser.displayName,
            photoURL: loginUser.photoURL
          },
          [mergedId + ".date"]:serverTimestamp()
        });
      }

      dispatch({type: "CHANGE_USER", payload: user})
    } catch (error) {
      
    }

    setUser(null)
    setSearchUser("")
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Search' onKeyDown={handleKey} onChange={(e) => setSearchUser(e.target.value)} value={searchUser} />
      </div>
      {error && <span>No any such user...</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className='userChatInfo'>
          <span>{user.username}</span>
        </div>
      </div> }
    </div>
  )
}
