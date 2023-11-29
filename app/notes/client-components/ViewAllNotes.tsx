'use client'

import { useEffect, useState } from "react";
import { getAllNotes } from "../server-functions/load-notes";
import BasicEditor, { BasicEditorWithInput } from "@/app/components/BasicEditor";

export default function ViewAllNotes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  useEffect(() => {
    async function getNotes() {
      setLoading(true);
      const notes = await getAllNotes();
      console.log('notes: ', notes)
      setNotes(notes);
      notes.length >= 1 && setSelectedNote(notes[0]);
      setLoading(false);
    }
    getNotes();
  }, [])

  function NoteSelectSideBar() {
    return (
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content
        rounded-box scrollbar-thin scrollbar-track-rounded-full 
        scrollbar-thumb-rounded-full scrollbar-thumb-blue-700 scrollbar-track-blue-300 
        dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
      >
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
              className="h-1/4"
            >
              <BasicEditorWithInput
                givenMarkdown={selectedNote?.Content}
              />
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

  if (loading) return (
    <div
      className="w-full h-full m-auto flex justify-center items-center"
    >
      <span className="loading loading-spinner loading-lg m-auto"></span>
    </div>
  )

  return (
    <div className="h-full w-full">
      <LayoutOne />
    </div>
  )
}