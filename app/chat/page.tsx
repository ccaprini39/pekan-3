import React from "react";
import { Chat } from "./client/Chat";
import { ChatWithMarkdown } from "./client/ChatWithMarkdown";


export default async function ChatPage() {
  return (
    <div className="w-full h-full p-5">
      <ChatWithMarkdown />
    </div>
  )
}