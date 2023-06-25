'use client';

import { useEffect, useState } from "react";
import { useChat } from "ai/react";

export function Chat() {

  const defaultMessage = 'you are a helpful assistant performing a role similar to a therapist.  You take in input from the user and give a short response that is either reassuring or critical, and end your response with a related question';
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(messages);
  }, [messages])

  if (loading) return <p>loading...</p>
  return (
    <div className="m-5 w-7/8">
      {messages.length > 0 && messages.map((message, index) => (
        <ChatText key={index} message={message} />
      ))}
      <form className="relative" onSubmit={handleSubmit}>
        <textarea
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          rows={4}
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="type a message"
        />
        <button 
          className="absolute right-4 bottom-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}


export function ChatText( { message }: { message: ChatMessage } ) {

  if (message.role === 'system') return <div></div>
  else if (message.role === 'user') {
    return (
      <div className="chat chat-end">
        <div className="chat-header">
          {message.role}
        </div>
        <div className="chat-bubble">
          {message.content}
        </div>
        <div className="chat-footer opacity-50">
        {message.createdAt?.toDateString()}
        </div>
      </div>
    )
  } else if (message.role === 'assistant') {
    return (
      <div className="chat chat-start">
        <div className="chat-header">
          {message.role}
        </div>
        <div className="chat-bubble">
          {message.content}
        </div>
        <div className="chat-footer opacity-50">
          {message.createdAt?.toDateString()}
        </div>
      </div>
    )
  }
}

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt?: Date;
  id: string;
}