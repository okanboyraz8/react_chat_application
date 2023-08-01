import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

export default function Chats() {

  const [chats, setChats] = useState([]);
  const { loginUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "usersChats", loginUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    loginUser.uid && getChats();
  }, [loginUser.uid])

  //console.log("chats", chats);
  //console.log("chats", Object.entries(chats)); //Konsala bu şekilde yazılacak!!!

  const handleSelect = (k) => {
    dispatch({type: "CHANGE_USER", payload: k})
  }

  return (
    <div className='chats'>
      {
        Object.entries(chats)?.sort((a,b) => b[1].date-a[1].date).map(chat => (
          <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className='userChatInfo'>
              <span>{chat[1].userInfo.username}</span>
              <p>{chat[1].lastMessage?.text}</p>          
            </div>
          </div>
      ))
      }
    </div>
  )
}
