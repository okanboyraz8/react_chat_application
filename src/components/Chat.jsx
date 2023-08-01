import React, { useContext } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import Messages from './Messages'
import Input from './Input'


export default function Chat() {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.username}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
