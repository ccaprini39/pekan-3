"use client";

import { FormEvent, use, useEffect, useRef, useState } from "react";
import { Message } from "ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";

export function ChatBubble({
  message,
  last,
  inProgress,
}: {
  message: Message;
  last: boolean;
  inProgress: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function scrollToBottom() {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current?.focus();
    }
    last && scrollToBottom();
  }, [ref, message, inProgress]);

  if (message.role === "system") return <div></div>;
  else if (message.role === "user") {
    return (
      <div ref={ref} className="flex flex-col justify-end px-3 m-1 bg-blue-900 border border-white rounded-md border-1">
        <div className="ml-auto opacity-50">{message.role}</div>
        <div className="ml-auto">
          <ChatContent text={message.content} />
        </div>
        <div className="ml-auto opacity-50">
          {message.createdAt?.toDateString()}
        </div>
      </div>
    );
  } else if (message.role === "assistant") {
    return (
      <div ref={ref} className="flex flex-col justify-start px-3 m-1 bg-gray-900 border-white rounded-md border-1">
        <div className="opacity-50">{message.role}</div>
        <div className="">
          <div>
            <ChatContent text={message.content} />
          </div>
        </div>
        <div className="opacity-50">
          {message.createdAt?.toDateString()}
        </div>
      </div>
    );
  } else return <div></div>;
}

export function ChatContent({ text }: { text: string }) {
  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={atomDark}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

export function TextEntryField({
  input,
  setInput,
  onSubmit,
}: {
  input: string;
  setInput: (input: string) => void;
  onSubmit: () => void;
}) {
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus();
  }, [focus, ref]);
  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <textarea
          ref={ref}
          className="w-full h-full p-2 text-sm text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
      </div>
      <div className="flex-none">
        <button
          className="px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => onSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export function SystemMessageField({
  systemMessageContent,
  setSystemMessageContent,
}: {
  systemMessageContent: string;
  setSystemMessageContent: (input: string) => void;
}) {
  <div className="h-10">
    <input
      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      type="text"
      value={systemMessageContent}
      onChange={(e) => setSystemMessageContent(e.target.value)}
    />
  </div>;
}

export function ChatMessages({
  messages,
  loading,
  systemMessageContent,
  setSystemMessageContent,
}: {
  messages: Message[];
  loading: boolean;
  systemMessageContent: string;
  setSystemMessageContent: (input: string) => void;
}) {
  if (loading) return <p>loading...</p>;
  return (
    <div className="flex flex-col h-full w-7/8 ">
      <div className="h-10">
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={systemMessageContent}
          onChange={(e) => setSystemMessageContent(e.target.value)}
        />
      </div>
      <label className="w-full ml-5">
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {messages.map((message, i) => (
            <ChatBubble
              key={i}
              message={message}
              last={i === messages.length - 1}
              inProgress={loading}
            />
          ))}
        </div>
      </label>
    </div>
  );
}

export function Chat({
  messages,
  loading,
  systemMessageContent,
  setSystemMessageContent,
  input,
  setInput,
  onSubmit,
}: {
  messages: Message[];
  loading: boolean;
  systemMessageContent: string;
  setSystemMessageContent: (input: string) => void;
  input: string;
  setInput: (input: string) => void;
  onSubmit: any;
}) {
  const reversedMessages = messages.slice().reverse();
  return (
    <div className="flex flex-col justify-between h-full min-h-full">
      <div className="h-10">
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={systemMessageContent}
          onChange={(e) => setSystemMessageContent(e.target.value)}
        />
      </div>
      <div className="w-full h-full">
        <div className="flex flex-col-reverse w-full h-full overflow-y-auto">
          {reversedMessages.map((message, i) => (
            <ChatBubble
              key={i}
              message={message}
              last={i === messages.length - 1}
              inProgress={loading}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-grow">
          <Textarea
            className="w-full h-full p-2 text-sm text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e : any) => {
              if (e.key === "Enter" && !e.shiftKey) {
                onSubmit(e)
              }
            }}
          />
        </div>
        <div className="flex-none">
          <button
            className="px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatPageComponent(
  { initialMessages }: { initialMessages?: Message[] }
){

  const defaultMessage =
  `you are a helpful assistant performing a role similar to a therapist. 
  You take in input from the user and give a short response that is either reassuring or critical, 
  and end your response with a related question`

  //if there are no initial messages, set the initial messages to the default message
  if (!initialMessages) initialMessages = [
    {
      id: "something",
      role: "system",
      content: defaultMessage,
      createdAt: new Date(),
    },
  ];

  const {
    messages,
    input,
    isLoading,
    setInput,
    handleSubmit,
    reload,
    stop,
    setMessages,
  } = useChat({
    initialMessages,
  });
  return (
    <div className="w-screen h-screen p-5">
      <Chat
        messages={messages}
        loading={isLoading}
        systemMessageContent={defaultMessage}
        setSystemMessageContent={(input) => {}}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  )
}