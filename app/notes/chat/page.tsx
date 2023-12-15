'use client';

import { ChatText } from '@/app/chat/client/ChatWithMarkdown';
import { Message } from 'ai';
import { useChat } from 'ai/react';

export default function HuggingFaceChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({api: '/api/hf-chat'});

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch h-screen max-h-screen overflow-auto">
      {messages.map((message, index) => {
        let last = false;
        if (index === messages.length - 1) last = true;
        return (
          <div key={message.id}>
            <ChatText 
              message={message} 
              last={last} 
              autoPlay={false}
              inProgress={false}
            />
          </div>
        )
      }
      )}

      <form
        className='flex flex-row fixed w-full bottom-0'
        onSubmit={handleSubmit}
      >
        <label>
          <input
            className="max-w-md border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

function ChatMessages({ messages }: { messages: Message[] }) {
  //now this will 
}