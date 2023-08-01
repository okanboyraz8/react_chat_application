import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      setError(true)      
    }
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat Application</span>
            <span className='title'>Login Page</span>
            <form onSubmit={handleSubmit} >
                <input required type='text' placeholder='Email' />                
                <input required type='password' placeholder='Password' />
                <button>Login</button>
                {error && <span>Sorry, something went wrong</span>}
            </form>
            <p>
                If you do not have a membership, please <Link to="/register">Register</Link>            
            </p>          
        </div> 

    </div>
  )
}
