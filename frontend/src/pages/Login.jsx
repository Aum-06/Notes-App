import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import api from '../utils/api'



const Login = () => {

    const navigate=useNavigate();
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   const handleLogin=async (e)=>{
    e.preventDefault();
    if(!email){
        setError("Please enter email")
        return;
    }
    if(!password){
        setError("Please enter password")
        return;
    }
    setError("")

    try {
        const response = await api.post('/user/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/home')  
      } catch (error) {
        console.error("Login error:", error);
      }
   }
   
   

  return (
    <div>
        <Navbar />
        <div className="flex justify-center items-center mt-28">
            <div className="w-[400px] border-[1.5px] rounded px-10 py-6 flex flex-col gap-6 ">
                <form action="" onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-4 text-center font-bold'>Login</h4>
                    <input type="text" placeholder='email' className='input-box' 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}/>
                    <PasswordInput
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                     />
                    {error && <p className='text-sm text-red-500'>{error}</p> } 
                    <button className='primary-btn'>Login</button>
                    <div className="flex items-center justify-center gap-2 mt-6 ">
                    <p className='text-sm'>Not Registered Yet?</p>
                    <Link to='/' className='font-medium underline text-primary text-sm'>Creata an account</Link>

                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login