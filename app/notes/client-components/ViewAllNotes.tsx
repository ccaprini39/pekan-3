'use client'

import { useEffect, useState } from "react";
import { getAllNotes } from "../server-functions/load-notes";

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
      <div className="flex flex-col bg-slate-700 w-full max-h-full overflow-x-hidden rounded-md scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-blue-700 scrollbar-track-blue-300">
        {notes.map((note, index) => {
          return (
            <div key={index}
              className="flex flex-col m-1 rounded-md border hover:bg-slate-500 cursor-pointer"
              onClick={() => setSelectedNote?.(note)}
            >
              {note.Title}
            </div>
          )
        })}
      </div>
    )
  }

  function LayoutOne(){
    return (
      <div className="h-full w-full flex">
        <div
          className="m-2 w-2/12"
        >
          <NoteSelectSideBar />
        </div>
        <div className="m-2 w-10/12">
          <h2 className="text-2xl font-bold">{selectedNote?.Title}</h2>
          <p>{selectedNote?.Content}</p>
        </div>
      </div>
    )
  }

  if (loading) return <div>Loading...</div>
  return (
    <div className="h-full w-full">
      <LayoutOne />
    </div>
  )
}