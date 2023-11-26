'use client'

import { Message } from 'ai';
import { useChat } from 'ai/react'
import React, { useState, useEffect, FormEvent, useRef } from 'react'
import { ChatText } from '../chat/client/Chat';

export default function ConversationPage() {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const defaultMessage = 'you are a helpful assistant';
  const defaultMessage2 = 'you are a stubborn and rude boss';

  const [systemMessageContent, setSystemMessageContent] = useState<string>(defaultMessage);
  const [systemMessageContent2, setSystemMessageContent2] = useState<string>(defaultMessage2);

  const initialMessages: Message[] = [
    {
      id: 'something',
      role: 'system',
      content: defaultMessage,
      createdAt: new Date()
    }
  ]

  const { messages, input, isLoading, handleInputChange, handleSubmit, reload, stop, setMessages } = useChat({
    initialMessages
  });

  const [currentPerson, setCurrentPerson] = useState('user');
  function toggleCurrentPerson() {
    if (currentPerson === 'user') {
      setCurrentPerson('assistant');
    } else {
      setCurrentPerson('user');
    }
  }

  useEffect(() => {
    async function updateSystemMessage() {
      const newSystemMessage: Message = {
        id: 'something',
        role: 'system',
        content: systemMessageContent,
        createdAt: new Date()
      }
      const messageClone = [...messages];
      const index = messageClone.findIndex(message => message.role === 'system');
      messageClone[index] = newSystemMessage;
      setMessages(messageClone);
    }
    (systemMessageContent !== defaultMessage) && updateSystemMessage();
  }, [systemMessageContent])

  useEffect(() => {
    async function updateSystemMessage() {
      const newSystemMessage: Message = {
        id: 'something',
        role: 'system',
        content: systemMessageContent2,
        createdAt: new Date()
      }
      const messageClone = [...messages];
      const index = messageClone.findIndex(message => message.role === 'system');
      messageClone[index] = newSystemMessage;
      setMessages(messageClone);
    }
    (systemMessageContent2 !== defaultMessage2) && updateSystemMessage();
  }, [systemMessageContent2])

  useEffect(() => {

    //custom submit function 
    async function handleClick( event: FormEvent<HTMLFormElement> ){
      event.preventDefault();
      const button = document.getElementById('form') as HTMLFormElement;
      //set the input value to the last message
      const lastMessage = messages[messages.length - 1];
      const input = document.getElementById('textarea') as HTMLInputElement;
      input.value = lastMessage.content;
      console.log('input: ', input.value)
      handleSubmit(event);
    }

    console.log(messages.length)
    if (messages.length > 2 && messages.length < 15) {
      const lastMessage = messages[messages.length - 1];
      let newMessages;
      if (lastMessage.role === 'user') {
        setCurrentPerson('assistant');
        newMessages = convertConversation(messages, systemMessageContent);
      } else {
        setCurrentPerson('user');
        newMessages = convertConversation(messages, systemMessageContent2);
      }
      setMessages(newMessages);  
    }
    !isLoading && messages.length > 2 && messages.length < 15;
  }, [isLoading])


  return (
    <div
      className='py-5 h-full flex flex-col justify-between'
    >
      <div
        className="flex flex-row h-10"
      >
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={systemMessageContent}
          onChange={(e) => setSystemMessageContent(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={systemMessageContent2}
          onChange={(e) => setSystemMessageContent2(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {messages.length > 0 && messages.map((message, index) => {
          //check if it it is the last message
          let last = false;
          if (index === messages.length - 1) last = true;
          return (
            <ChatText
              key={index}
              message={message}
              last={last}
              inProgress={isLoading}
              autoPlay={false}
            />
          )
        })
        }
      </div>
      <form id='form' className="relative px-5" onSubmit={handleSubmit}>
        <textarea
          id='textarea'
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-full"
          name="message"
          rows={3}
          value={input}
          onChange={handleInputChange}
          placeholder="type a message"
        />
        <button
          ref={sendButtonRef}
          id="button"
          className="absolute right-6 bottom-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

// this is a function that takes in an array of message objects
// it will go through each and if the role is user it will be changed to assistant
// if the role is assistant it will be changed to user
// it will take in the system message content and change the system message
function convertConversation(messages: Message[], systemMessageContent: string) {
  const newMessages = messages.map((message) => {
    // Create a copy of the message object
    const newMessage = { ...message };

    if (newMessage.role === 'system') {
      newMessage.content = systemMessageContent;
    }
    ;
    if (newMessage.role === 'user') {
      newMessage.role = 'assistant';
    } else if (newMessage.role === 'assistant') {
      newMessage.role = 'user';
    }
    return newMessage;
  });

  if (messages.length === 1) {
    return newMessages;
  }

  console.log('new messages: ', newMessages)
  return newMessages;
}

const sampleObject = [
  {
    "id": "something",
    "role": "system",
    "content": "you are a helpful assistant",
    "createdAt": "2023-11-26T01:08:05.808Z"
  },
  {
    "content": "Hello!",
    "role": "user",
    "createdAt": "2023-11-26T01:08:06.939Z",
    "id": "MRCgCmR"
  },
  {
    "id": "_6k1qlPus66BNwNe8eB7I",
    "createdAt": "2023-11-26T01:08:07.874Z",
    "content": "Hello! How can I assist you today?",
    "role": "assistant"
  }
]

