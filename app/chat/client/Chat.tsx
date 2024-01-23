'use client';

import { use, useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Message } from "ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from "rehype-highlight/lib";
import { AudioComponent } from "@/app/components/AudioComponent";
import React from "react";

export function Chat() {

  const defaultMessage = 'you are a helpful assistant performing a role similar to a therapist.  You take in input from the user and give a short response that is either reassuring or critical, and end your response with a related question';
  const initialMessages: Message[] = [
    {
      id: 'something',
      role: 'system',
      content: defaultMessage,
      createdAt: new Date()
    }
  ]

  const Obj : object = 


  async function saveMessagesToLocalStorage() {
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  async function removeLastMessage() {
    const messageClone = [...messages];
    messageClone.pop();
    setMessages(messageClone);
  }

  async function loadMessagesFromLocalStorage() {
    const messages = localStorage.getItem('messages');
    if (messages) {
      const messagesObject = JSON.parse(messages);
      const index = messagesObject.findIndex((message: Message) => message.role === 'system');
      const remappedMessages = messagesObject.map((message: Message) => {
        if (typeof message.createdAt === 'string') {
          message.createdAt = new Date(message.createdAt);
        }
        return message;
      })
      setSystemMessageContent(messagesObject[index].content);
      setMessages(remappedMessages);
    }
  }

  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const { messages, input, isLoading, handleInputChange, handleSubmit, reload, stop, setMessages } = useChat({
    initialMessages
  });

  const [systemMessageContent, setSystemMessageContent] = useState<string>(defaultMessage);

  useEffect(() => {
    async function updateSystemMessage() {
      setLoading(true);
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
      setLoading(false);
      //reload();
    }
    (systemMessageContent !== defaultMessage) && updateSystemMessage();
  }, [systemMessageContent])

  useEffect(() => {
    console.log('is loading: ', isLoading);
  }, [isLoading])


  async function handleReload() {
    stop();
    await reload();
  }

  async function handleStop() {
    stop();
  }

  async function handleClearMessages() {
    const newMessages: Message[] = [{
      id: 'something',
      role: 'system',
      content: systemMessageContent,
      createdAt: new Date()
    }]
    setMessages(newMessages);
  }


  if (loading) return <p>loading...</p>
  return (
    <div className="flex flex-col h-full w-7/8 ">
      <div
        className="h-10"
      >
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={systemMessageContent}
          onChange={(e) => setSystemMessageContent(e.target.value)}
        />
      </div>
      <label className="w-full ml-5">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          checked={autoPlay}
          onChange={() => setAutoPlay(!autoPlay)}
        />
        Play Audio
      </label>

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
              autoPlay={autoPlay}
            />
          )
        })
        }
      </div>
      <div>
        <form className="relative px-5" onSubmit={handleSubmit}>
          <textarea
            className="w-full h-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            name="message"
            rows={3}
            value={input}
            onChange={handleInputChange}
            placeholder="type a message"
          />
          <button
            className="absolute px-4 py-2 font-bold text-white bg-blue-500 rounded right-6 bottom-8 hover:bg-blue-700 focus:outline-none focus:shadow-outline "
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="flex flex-row justify-center">


          <div className="float-left mx-5 join">
            <button
              className="mx-1 btn btn-sm btn-info join-item btn-outline "
              onClick={saveMessagesToLocalStorage}
            >
              Save
            </button>
            <button
              className="mx-1 btn btn-sm btn-outline btn-warning join-item"
              onClick={loadMessagesFromLocalStorage}
            >
              Load
            </button>
          </div>
          <div className="mx-auto join">
            <button
              className="mx-1 btn btn-sm btn-outline join-item"
              onClick={removeLastMessage}
            >
              Remove Last Message
            </button>
            <button
              className="mx-1 btn btn-sm btn-info join-item btn-outline"
              onClick={handleClearMessages}
            >
              Clear
            </button>
          </div>
          <div className="float-right mx-5 join">
            <button
              className="mx-1 btn btn-sm btn-success join-item btn-outline "
              onClick={handleReload}
            >
              Reload
            </button>
            <button
              className="mx-1 btn btn-sm btn-outline btn-error join-item"
              onClick={handleStop}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export function ChatText({ message, last, inProgress, autoPlay }: { message: Message, last: boolean, inProgress: boolean, autoPlay: boolean }) {

  const ref = useRef<HTMLDivElement>(null);
  //this is used to scroll to the audio component
  const secondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function scrollToBottom() {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      ref.current?.focus();
    }
    last && scrollToBottom();
  }, [ref, message, inProgress])

  useEffect(() => {
    function scrollToBottom() {
      secondRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      secondRef.current?.focus();
    }
    last && autoPlay && scrollToBottom();
  }, [secondRef, message, inProgress, autoPlay])

  if (message.role === 'system') return <div></div>
  else if (message.role === 'user') {
    return (
      <div
        ref={ref}
        className="mx-5 chat chat-end"
      >
        <div className="chat-header">
          {message.role}
        </div>
        <div className="chat-bubble">
          <ChatContent text={message.content} />
        </div>
        <div className="opacity-50 chat-footer">
          {message.createdAt?.toDateString()}
        </div>
      </div>
    )
  } else if (message.role === 'assistant') {
    return (
      <div
        ref={ref}
        className="mx-5 chat chat-start"
      >
        <div className="chat-header">
          {message.role}
        </div>
        <div className="chat-bubble">
          <div>
            <ChatContent text={message.content} />
          </div>
        </div>
        <div className="flex flex-row opacity-50 chat-footer">
          {message.createdAt?.toDateString()}
          {!inProgress &&
            <AudioComponent
              string={message.content}
              voice='alloy'
              filename='new-speech-3.mp3'
              defaultOpen={last && autoPlay}
              autoPlay={last && autoPlay}
            />
          }
        </div>

      </div>
    )
  }
}

export function ChatContent({ text }: { text: string }) {

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={atomDark}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}
    />
  )

}