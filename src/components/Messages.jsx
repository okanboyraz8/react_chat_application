import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import {doc, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase/config'
import { ChatContext } from '../contexts/ChatContext'

export default function Messages() {

  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {

    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
    
  }, [data.chatId])

  console.log("messages", messages);

  return (
    <div className='messages'>
      {
        messages.map(m => (
          <Message message={m} key={m.id} />
        ))
      }      
    </div>
  )
}
