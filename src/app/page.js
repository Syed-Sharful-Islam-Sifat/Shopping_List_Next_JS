"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
export default function Home() {
  
  const {data} = useSession();
  return (
      <div className='homepage'>
          <h1>Welcome,to the Shopping</h1>
          {
            (data)?(
              <p>Please go to <Link href={'/additem'}>additem</Link> to add or delete an item</p>
            ):(
               <p>Please Login to add items to your shopping list</p>
            )
          }
      </div>
  )
}
