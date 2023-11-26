import './globals.css'
import { Session } from 'next-auth';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import AuthContext from './AuthContext';
import checkSession from './api/auth/sessionChecker';
import React from 'react';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pekan',
  description: 'Mental health chatbot',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await checkSession();
  return (
    <html lang="en">
      {/* <AuthContext session={session}>
        <body className={inter.className + " w-screen h-screen"}>{children}</body>
      </AuthContext> */}
      <body className={inter.className + " w-screen h-screen"}>{children}</body>
    </html>
  )
}
