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
    alert('created note ' + note.id)
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
      className="h-full w-full flex flex-col-reverse pr-2"
    >
      {shallowNotes.map((note: any) => (
        <a
          className='hover:bg-gray-900 rounded-md h-8 max-h-8 no-underline text-sm overflow-x-hidden truncate whitespace-nowrap cursor-pointer'
          key={note.id}
          id={note.id}
          onClick={handleFollowLink}
        >
          {note.Title}
        </a>
      ))}
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
    </div>
  )
}