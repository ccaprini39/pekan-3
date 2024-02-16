'use client'
import HorizontalComponentsResize from '@/app/components/HorizontalComponentsResize';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { ChatPageComponent } from '../client/RenderMessage';
import { Message } from 'ai';

export default function ThoughtComponent() {

  const systemMessage = `you are my pet project, I am trying to make you as smart as possible.
  
  Always try to use the contents of this system message when answering the user's input if it is something you don't have direct access to, like information about the user, the date, ect
  
  the system message also takes priority over previous messages
  `;

  const [thoughts, setThoughts] = useLocalStorage({ key: 'thoughts', defaultValue: '' });
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function setInitialMessagesToUse(){
      setInitialMessages([
        {id: 'something',
        role: 'system',
        content: systemMessage + thoughts,
        createdAt: new Date()
      }])
    }
    
    setInitialMessagesToUse()
  },[thoughts])

  return (
    <div
      className='w-full h-full p-5'
    >
      <HorizontalComponentsResize>
        <ChatPageComponent
          initialMessages={initialMessages}
          systemMessageVisible={false}
        />
        <Textarea
          className='w-full h-full'
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
        />
      </HorizontalComponentsResize>

    </div>
  )
}