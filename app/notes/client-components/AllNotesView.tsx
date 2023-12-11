'use client'

import { useEffect, useState } from "react";
import { getAllNotes } from "../server-functions/load-notes";
import { NoteEditor } from "@/app/components/BasicEditor";
import { createBlankNote, createNote } from "../server-functions/create-note";
import { deleteNote } from "../server-functions/delete-note";
import { sleep } from "openai/core";
import { BasicTabsWithContent } from "@/app/components/TabsWithContent";

interface Tab {
  name: string,
  content: any
}
export default function AllNotesView() {
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [displayMessage, setDisplayMessage] = useState<string>('')
  const [tabs, setTabs] = useState<Tab[]>([])

  useEffect(() => {
    async function getNotes() {
      setLoading(true);
      const notes = await getAllNotes();
      const lastNote = notes[notes.length - 1]
      setSelectedNote(lastNote)
      setNotes(notes);
      setTabs(notes.map((note: any) => {
        return {
          name: note.Title,
          content: <NoteEditor
            noteId={note.id}
            deleteNote={async (noteId: string) => {
              setNotes(await getAllNotes());
              setSelectedNote?.(notes[0]);
              return note;
            }}
          />
        }
      }))
      setLoading(false);
    }
    getNotes();
  }, [])

  async function handleCreateNote(note?: any) {
    if (note) {
      const newNote = await createNote({
        Title: note.Title,
        Content: note.Content
      })
      setNotes(await getAllNotes());
      setSelectedNote?.(newNote);
      return
    } else {
      const newNote = await createBlankNote();
      setNotes([...notes, note]);
      setSelectedNote?.(newNote);
    }
  }

  async function handleDeleteNote(noteId: string) {
    const note = await deleteNote(noteId);
    setDisplayMessage(`Deleted ${note.Title}`)
    setNotes(await getAllNotes());
    setSelectedNote?.(notes[0]);
  }

  async function handleRefresh(e?: any) {
    e && e.preventDefault()
    const notes = await getAllNotes();
    setNotes(notes);
    //if the selected note is not in the new list of notes, select the first note
    const selectedNoteInNewNotes = notes.find((note: any) => note.id === selectedNote?.id)
    if (!selectedNoteInNewNotes) {
      setSelectedNote?.(notes[0]);
    }
  }

  function NoteSelectSideBar() {
    const [newNoteTitle, setNewNoteTitle] = useState<string>('')

    const [newNoteOpen, setNewNoteOpen] = useState<boolean>(false)
    return (
      <ul className="menu p-4 w-80 max-h-full bg-base-300 text-base-content
        rounded-box scrollbar-thin scrollbar-track-rounded-full 
        scrollbar-thumb-rounded-full scrollbar-thumb-blue-700 scrollbar-track-blue-300 
        dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
      >
        <div>
          <input type="text" className="input input-bordered input-sm mb-2"
            placeholder="Search Notes"
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          {
            newNoteOpen ?
              <>
                <input type="text" className="input input-bordered input-sm mb-2"
                  placeholder="New Note Title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
                <button className="btn btn-ghost btn-sm rounded-btn mb-2"
                  onClick={() => {
                    handleCreateNote(
                      {
                        Title: newNoteTitle,
                        Content: ''
                      }
                    )
                    setNewNoteOpen(false)
                  }}
                >
                  Create
                </button>
              </>
              :
              <button className="btn btn-ghost btn-sm rounded-btn mb-2"
                onClick={() => setNewNoteOpen(true)}
              >
                New Note
              </button>
          }
          <button className="btn btn-ghost btn-sm rounded-btn mb-2"
            onClick={handleRefresh}
          >
            refresh
          </button>
        </div>

        {notes.map((note, index) => {
          return (
            <li key={index}
              onClick={() => setSelectedNote?.(note)}
            >
              <a>
                {note.Title}
              </a>
            </li>
          )
        })}
      </ul>

    )
  }

  function Message() {
    const [messageVisible, setMessageVisible] = useState<boolean>(false)

    useEffect(() => {
      if (messageVisible) {
        setTimeout(() => {
          setMessageVisible(false)
        }, 3000)
      }
    }, [messageVisible])

    return (
      messageVisible &&
      <div className="toast toast-start">
        <div className="alert alert-error">
          {displayMessage}
        </div>
      </div>
    )
  }


  function LayoutOne() {
    return (
      <div className="h-full w-full">
        <Message />
        <div className="drawer h-full max-h-full overflow-y-auto">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content h-full">
            <div
              className="w-full h-98-percent flex flex-col"
            >
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">
                File Explorer
              </label>
              {
                loading ? (
                  <div className="flex justify-center items-center h-full w-full">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    <NoteEditor
                      deleteNote={handleDeleteNote}
                      noteId={selectedNote?.id}
                    />
                    {/* <BasicTabsWithContent tabs={tabs} /> */}
                  </div>
                )
              }
            </div>
            {/* Page content here */}
          </div>
          <div className="drawer-side z-20">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <NoteSelectSideBar />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <LayoutOne />
    </div>
  )
}