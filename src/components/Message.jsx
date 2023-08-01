import React, { useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import moment from 'moment';

// Tarih Formatlama İşlemi, TR'ye göre...
import 'moment/locale/tr'

// owner class'ına göre mesajı kimin atıp atmadığını ayarladık! Biz mi yoksa karşı taraf mı?
export default function Message({ message }) {

  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Mesaj atılınca scroll'un aşağı kayma işlem başlangıcı
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId===loginUser.uid && "owner"}`}>
      <div className='messageInfo'>
        <img src={message.senderId===loginUser.uid ? loginUser.photoURL : data.user.photoURL} alt="" />
        <span>{moment(new Date(message.date.toDate())).fromNow()}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt='' />}
      </div>
    </div>
  )
}
