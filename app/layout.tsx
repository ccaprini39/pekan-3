import './globals.css'
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pekan',
  description: 'Some things'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
