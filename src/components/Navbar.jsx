import React, { useContext } from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {

  const { loginUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='logo'>C&A</span>
      <div className='user'>
        <img src={loginUser.photoURL} alt="" />
        <span>{loginUser.displayName}</span>
        <button onClick={() => signOut(auth)} >LogOut</button>
      </div>
    </div>
  )
}
