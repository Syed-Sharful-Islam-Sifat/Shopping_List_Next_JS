// components/Header.js
"use client"
import { signOut, useSession } from 'next-auth/react';
import '../styles/Header.css';
import Link from 'next/link';
const Header = () => {
  const {data} = useSession();
  console.log(data)
  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="header">
      <div className="left">

        <h1>Shopping</h1>
      </div>
      <div className="right">
        <div className='Link'>
         <Link href={'/'}>Home</Link>
        </div>
        {data ? (
         <div className='name-log-out'>  
           <h3>{`Hi ${data?.user?.name}`}</h3>  
          <span className="logout" onClick={handleLogout}>
            Logout
          </span>

          </div>
        ) : (
          // You can put your login or account link here when the user is not logged in.
         <Link href={'/login'}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
