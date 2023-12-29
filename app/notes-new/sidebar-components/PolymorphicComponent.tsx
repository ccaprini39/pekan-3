import ChatComponent from "./ChatComponent"
import NotesList from "./NotesList"


export default function PolyComponent({ type }: { type: string }) {
  if (type === 'notes') {
    return (
      <div className='h-full w-full'>
        <NotesList />
      </div>
    )
  } else if (type === 'search') return <div>search</div>
  else if (type === 'chat') return <ChatComponent />
  else return (
    <div
      className="h-full w-full"
    >
      {type} ???
    </div>
  )
}