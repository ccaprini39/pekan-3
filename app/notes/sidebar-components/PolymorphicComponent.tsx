import { useState } from "react"
import ChatComponent from "./ChatComponent"
import NotesList from "./NotesList"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function PolyComponent({ type }: { type: string }) {
  if (type === 'notes') {
    return (
      <div className='h-full w-full'>
        <NotesList />
      </div>
    )
  } else if (type === 'search') return (
    <div className='h-full min-h-full w-full'>
      <div
        className='h-full w-full flex items-center justify-center'
      >
        Search
      </div>
    </div>
  )
  else if (type === 'chat') return (
    <div className='h-full w-full min-h-full'>
      <ChatComponent />
    </div>
  )
  else return (
    <div
      className="h-full w-full"
    >
      {type} ???
    </div>
  )
}