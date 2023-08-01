import React, { useState } from 'react'
import Add from '../img/users.png'

//Auth-Storage-Firestore from Firebase
import { auth, storage, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

//react-router-dom package
import { useNavigate, Link } from 'react-router-dom'


//e.preventDefault(); => Böylece varsayılan özellikler yok edildi! Submit olduğunda "postback" olmasın diye...
export default function Register() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e.target[0].value);
        setLoading(true)
        setError(false)

        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //console.log("res", res);
            const date = new Date().getTime()
            const storageRef = ref(storage, `${username+date}`);

            await uploadBytesResumable(storageRef, avatar).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    //console.log(downloadURL);

                    try {
                        await updateProfile(res.user, {
                            displayName: username,
                            photoURL: downloadURL
                        })
                        //console.log("res.user", res.user);
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            username,
                            email,
                            photoURL: downloadURL 
                        })

                        await setDoc(doc(db, "usersChats", res.user.uid), {})
                        navigate('/')
                    } catch (error) {
                        setError(error.message)
                        setLoading(false)                        
                    }
                })
            })

            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat Application</span>
            <span className='title'>Join to have fun on Chat Dashboard</span>
            <form onSubmit={handleSubmit}>
                <input required type='text' placeholder='Username' />
                <input required type='text' placeholder='Email' />                
                <input required type='password' placeholder='Password' />
                <input required style={{display:"none"}} type='file' id='file' />
                <label htmlFor='file'>
                    <img src={Add} alt="" />
                    <span>Add Avatar</span>
                </label>
                <button disabled={loading} >Sign Up</button>
                {loading && <span>Please wait while creating a subscription...</span>}
                {error && <p>{error}</p>}
            </form>
            {!loading && <p>
                If you are already a member, please <Link to="/login">Login</Link>              
            </p>}          
        </div> 

    </div>
  )
}
