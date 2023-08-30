"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
const AuthProvider = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider