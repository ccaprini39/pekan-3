'use client'

import { createNote } from "@/app/notes/server-functions/create-note";
import { getAllNoteTitles } from "@/app/notes/server-functions/load-notes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VscNewFile, VscRefresh } from "react-icons/vsc";

export default function NotesList() {
  const [shallowNotes, setShallowNotes] = useState<any[]>([] as any[])
  const router = useRouter();
  const [creatingNote, setCreatingNote] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadNotes() {
      const notes = await getAllNoteTitles();
      setShallowNotes(notes);
      setLoading(false);
    }
    loadNotes();
  }, [])

  async function handleFollowLink(e: any) {
    e.preventDefault()
    const noteId = e.target.id;
    router.push(`/notes/${noteId}`)
  }

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
    alert('refreshed notes ')
    setShallowNotes(refreshedNotes);
  }

  return (
    <div
      className="flex flex-col-reverse w-full h-full pr-2"
    >
      {shallowNotes.map((note: any) => (
        <a
          className='h-8 overflow-x-hidden text-sm no-underline truncate rounded-md cursor-pointer hover:bg-gray-900 max-h-8 whitespace-nowrap'
          key={note.id}
          id={note.id}
          onClick={handleFollowLink}
        >
          {note.Title}
        </a>
      ))}
      <div>
        {creatingNote ?
          <form
            className='flex flex-row items-center justify-between h-8'
          >
            <input
              className='w-3/4 px-2 border border-gray-500 rounded'
              placeholder='New Note Title'
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <button
              className='w-1/4 px-2 border border-gray-500 rounded'
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
      <div
        className='flex flex-row items-center justify-end'
      >
        <div
          className='p-2 bg-black rounded-full cursor-pointer hover:bg-gray-700'
          onClick={() => setCreatingNote(!creatingNote)}
        >
          <VscNewFile />
        </div>
        <div>
          <button
            className='p-2 bg-black rounded-full cursor-pointer hover:bg-gray-700'
            onClick={handleRefresh}
          >
            <VscRefresh />
          </button>
        </div>
      </div>

    </div>
  )
}