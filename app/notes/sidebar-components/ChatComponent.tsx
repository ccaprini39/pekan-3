import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { VscArrowLeft, VscArrowRight, VscSend, VscTrash } from "react-icons/vsc";
import { Input } from "@/components/ui/input";
import { Undo } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ChatComponent() {
  const defaultMessage = `you are a helpful assistant
  You are assisting the user with analyzing the following document:`;
  const [systemMessageContent, setSystemMessageContent] = useState<string>(defaultMessage);
  const [contextVisible, setContextVisible] = useState<boolean>(false);
  const toggleContext = () => setContextVisible(!contextVisible);
  const initialMessages: Message[] = [
    {
      id: 'something',
      role: 'system',
      content: systemMessageContent,
      createdAt: new Date()
    }
  ]

  async function handleClearMessages() {
    const newMessages: Message[] = [{
      id: 'something',
      role: 'system',
      content: systemMessageContent,
      createdAt: new Date()
    }]
    setMessages(newMessages);
  }

  const { messages, input, isLoading, handleInputChange, handleSubmit, stop, setMessages } = useChat({ initialMessages, api: '/api/chat-with-xata' });

  async function removeLastMessage() {
    const messageClone = [...messages];
    messageClone.pop();
    setMessages(messageClone);
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
      //reload();
    }
    (systemMessageContent !== defaultMessage) && updateSystemMessage();
  }, [systemMessageContent])


  //what I need to do is load this from the layout, 
  if (contextVisible) return (
    <div
      className="mx-auto w-full flex flex-col justify-between stretch h-full max-h-full"
    >
      <Button
        className='max-h-full'
        size='sm'
        onClick={toggleContext}
      >
        <VscArrowLeft />
      </Button>
      <Textarea
        onChange={(e) => setSystemMessageContent(e.target.value)}
        value={systemMessageContent}
        className='w-full h-full'
      />
    </div>
  )

  return (
    <div className="mx-auto w-full flex flex-col justify-between stretch h-full max-h-full">
      <div
        className='flex flex-row w-full text-xs h-6 py-1 space-between items-center justify-between'
      >
        <Button
          className='max-h-full'
          size='icon'
          onClick={handleClearMessages}
        >
          <VscTrash />
        </Button>
        <Button
          className='max-h-full'
          size='icon'
          onClick={removeLastMessage}
        >
          <Undo />
        </Button>
        <Button
          className='max-h-full'
          size='icon'
          onClick={toggleContext}
        >
          <VscArrowRight />
        </Button>
      </div>
      <div
        className="flex-grow flex flex-col overflow-auto w-full max-w-full"
      >
        <ScrollArea className="w-full max-w-full">
          {messages.map((message, index) => {
            let last = false;
            if (index === messages.length - 1) last = true;
            if (message.role === 'system') { return null }
            return (
              <div
                key={message.id}
                className='border border-gray-500 rounded p-1 max-w-full w-full'
              >
                <div
                  className='text-sm font-bold opacity-50'
                >
                  {message.role}
                </div>
                <ChatContent text={message.content} />
              </div>
            )
          }
          )}
        </ScrollArea>

      </div>

      <form
        className='flex flex-row w-full'
        onSubmit={handleSubmit}
      >
        <div
          className="flex w-full items-center h-10 pb-1 text-xs space-x-2"
        >
          <Input
            className="m-1 h-full text-xs"
            value={input}
            onChange={handleInputChange}
          />
          <Button
            className=""
            size={'icon'}
            type="submit"
          >
            <VscSend />
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ChatContent({ text }: { text: string }) {

  return (
    <ReactMarkdown
      className="text-sm max-w-full w-"
      children={text}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              className="text-sm max-w-full w-full "
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