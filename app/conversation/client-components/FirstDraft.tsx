'use client'

import { Message } from "ai";
import { useChat } from "ai/react/dist";
import { useState } from "react";

export default function Conversation() {

  const initialMessages: Message[] = [
    {
      id: 'something',
      role: 'system',
      content: 'you are a helpful assistant',
      createdAt: new Date()
    }
  ]

  const [loading, setLoading] = useState(false)
  const {messages, input, handleInputChange, handleSubmit, reload, stop, setMessages} = useChat({initialMessages});//this is the intial chatter

  // messages is an array of Message objects
  // input is a string
  // handleInputChange is a function that takes an event
  // handleSubmit is a function that takes an event


  return (
    <div
      className='m-2'
    >
      <h1>Conversation</h1>
      <p>Coming soon...</p>
    </div>
  )
}