"use client"
import React, { useState } from 'react';
import {signIn} from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const LoginForm = () => {

  const router = useRouter();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const[error,setError] = useState('');
  const handleEmailChange = (e) => {
    setError('');
    setEmail(e.target.value);
  };
  const handlepassChange = (e) => {
    setError('')
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(email,password);

     
   
    try{
        
        const data = await signIn('credentials',{
            redirect: false,
            email,
            password,
        })

        if(data?.error){
           setError('Invalid Credentials');
           return;
        }

        router.push('/')

    }catch(error){
        console.log(error.message)
    }
  };

  return (
    <div className="container">
      {error?(
        <div className='error'>
          <h3>{error}</h3>
        </div>
      ):null}
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlepassChange}
          />
        </div>
        <button type="submit">Login</button>
        <span>
         <p>Not a member? <Link href={'/register'}>Register</Link></p>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;