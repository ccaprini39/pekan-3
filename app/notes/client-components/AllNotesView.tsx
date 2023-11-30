'use client'

import { useEffect, useState } from "react";
import { getAllNotes } from "../server-functions/load-notes";
import { NoteEditor } from "@/app/components/BasicEditor";

export default function AllNotesView() {
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotes() {
      setLoading(true);
      const notes = await getAllNotes();
      const lastNote = notes[notes.length - 1]
      setSelectedNote(lastNote)
      setNotes(notes);
      setLoading(false);
    }
    getNotes();
  }, [])

  async function handleRefresh(e : any){
    e.preventDefault()
    const notes = await getAllNotes();
    setNotes(notes);
  }

  function NoteSelectSideBar() {
    return (
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content
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
          <button className="btn btn-ghost btn-sm rounded-btn mb-2"
            onClick={() => console.log('')}
          >
            New Note
          </button>
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

  function LayoutOne() {
    return (
      <div className="h-full w-full">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div
              className="w-full h-98-percent flex flex-col"
            >
              {
                loading ? (
                  <div className="flex justify-center items-center h-full w-full">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    <NoteEditor
                      noteId={selectedNote?.id}
                    />
                  </div>
                )
              }
            </div>
            {/* Page content here */}

            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
              Open drawer
            </label>

          </div>
          <div className="drawer-side">
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