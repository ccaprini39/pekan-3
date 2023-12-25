'use client'
import { useEffect, useState } from 'react';
import { VscCommentDiscussion, VscFiles, VscNewFile, VscRefresh, VscSearch } from "react-icons/vsc";
import { GiAngelOutfit, GiDevilMask } from 'react-icons/gi';
import { getAllNoteTitles } from './server-functions/load-notes'
import interact from 'interactjs';
import { useLocalStorage } from '@mantine/hooks';
import { createNote } from './server-functions/create-note';
import { useRouter } from 'next/navigation';
import { useChat } from 'ai/react';
import { ChatContent } from '../chat/client/Chat';

export default function Layout({ children }: any) {
  const [selectedSidebar, setSelectedSidebar] = useLocalStorage<string>({ key: 'selectedSidebar', defaultValue: 'notes' });
  const [notes, setNotes] = useLocalStorage<any[]>({ key: 'notes', defaultValue: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      const notes = await getAllNoteTitles();
      console.log(notes)
      setNotes(notes);
      setLoading(false);
    }
    loadNotes();
  }, []);

  useEffect(() => {
    interact('.resizable-x')
      .resizable({
        edges: { right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            })

            Object.assign(event.target.dataset, { x, y })
          }
        }
      })
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col"
    >
      <header
        className="h-8 w-full border border-gray-500 flex items-center justify-center"
      >
        <GiAngelOutfit size='1.5em' />
        - Two Dameons Andon -
        <GiDevilMask size='1.5em' />
      </header>
      <div
        className="flex-grow flex flex-row w-full h-full max-h-full overflow-auto"
      >
        <div
          className='h-full border border-gray-500 w-12 flex flex-col items-center'
        >
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            style={selectedSidebar !== 'notes' ? { opacity: "50%" } : {}}
            onClick={() => setSelectedSidebar('notes')}
          >
            <VscFiles size='1.5em' />
          </a>
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            style={selectedSidebar !== 'search' ? { opacity: "50%" } : {}}
            onClick={() => setSelectedSidebar('search')}
          >
            <VscSearch size='1.5em' />
          </a>
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            style={selectedSidebar !== 'chat' ? { opacity: "50%" } : {}}
            onClick={() => setSelectedSidebar('chat')}
          >
            <VscCommentDiscussion size='1.5em' />
          </a>
        </div>
        <nav
          className="h-full border border-gray-500 resizable-x"
        >
          <PolyComponent type={selectedSidebar} />
        </nav>
        <main
          className='flex-grow h-full border border-gray-500'
        >
          {children}
        </main>
      </div>

    </div>
  )
  function PolyComponent({ type }: { type: string }) {
    if (loading) return (
      <div className='h-full w-full flex justify-center items-center'>
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    )
    if (type === 'notes') {
      return (
        <div className='h-full w-full'>
          <NotesList
            notes={notes}
          />
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
}



function NotesList({ notes }: { notes: any[] }) {
  const [shallowNotes, setShallowNotes] = useState<any[]>(notes)
  const router = useRouter();
  const [creatingNote, setCreatingNote] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');

  async function handleCreateNote(e: any) {
    e.preventDefault()
    const note = await createNote({
      Title: newNoteTitle,
      Content: ''
    })
    const newNoteId = note.id;
    setNewNoteTitle('')
    setCreatingNote(false)
    router.push(`/notes/${newNoteId}`)
    shallowNotes.push(note)
  }

  async function handleRefresh() {
    const refreshedNotes = await getAllNoteTitles();
    setShallowNotes(refreshedNotes);
  }

  return (
    <div
      className="h-full w-full flex flex-col pr-2"
    >
      <div
        className='flex flex-row justify-end items-center'
      >
        <div
          className='bg-black hover:bg-gray-700 rounded-full p-2 cursor-pointer'
          onClick={() => setCreatingNote(!creatingNote)}
        >
          <VscNewFile />
        </div>
        <div>
          <button
            className='bg-black hover:bg-gray-700 rounded-full p-2 cursor-pointer'
            onClick={handleRefresh}
          >
            <VscRefresh />
          </button>
        </div>
      </div>
      <div>
        {creatingNote ?
          <form
            className='flex flex-row justify-between h-8 items-center'
          >
            <input
              className='border w-3/4 border-gray-500 rounded px-2'
              placeholder='New Note Title'
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <button
              className='border w-1/4 border-gray-500 rounded px-2'
              type='submit'
              onClick={handleCreateNote}
            >
              {'>'}
            </button>
          </form>
          :
          <></>
        }
      </div>
      {shallowNotes.map((note: any) => (
        <a
          className='hover:bg-gray-900 no-underline text-sm'
          key={note.id}
          onClick={() => router.push(`/notes/${note.id}`)}
        >
          {note.Title}
        </a>
      ))}
    </div>
  )
}

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  console.log(messages)
  return (
    <div className="mx-auto w-full max-w-md pb-12 flex flex-col stretch h-screen max-h-screen">
      {messages.map((message, index) => {
        let last = false;
        if (index === messages.length - 1) last = true;
        return (
          <div
            key={message.id}
            className='border border-gray-500 rounded p-1'
          >
            <div
              className='text-sm font-bold opacity-50'
            >
              {message.role}
            </div>
            <br />
            {message.content}
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
            className="max-w-full border border-gray-300 rounded shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}