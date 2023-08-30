"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const RegisterForm = () => {

    const router= useRouter();

    const [error,setError] = useState('');
  const [formData, setFormData] = useState({
   name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('api/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })

    const data = await response.json();
   
    setError(data.error);
   if(response.ok)
    router.push('/login')
  };

  return (
    <div className="container">
      {error?(

        <div>
          <h3 >{error}</h3>
        </div>
      ):(null)}
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
