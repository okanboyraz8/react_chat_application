import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import { db, storage } from '../firebase/config'
import { doc, updateDoc, Timestamp, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

// Rastgele sayı oluşturmak için:
import { v4 as uuid } from 'uuid'

// import images
import Img from '../img/avatar2.png'
import Attach from '../img/avatar3.png'

export default function Input() {

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if(img){
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id:uuid(),
              text,
              senderId: loginUser.uid,
              date: Timestamp.now(),
              image: downloadURL
            })
          })
        })
      })
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: loginUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "usersChats", loginUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='input'>
      <input type="text" placeholder='Write your message' onChange={(e) => setText(e.target.value)} value={text} />
      <div className='send'>
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor='file'>
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} >SEND</button>
      </div>
    </div>
  )
}
