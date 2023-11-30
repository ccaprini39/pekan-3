'use client'

import { useEffect, useState, useRef } from "react";
import { getAllNotes, getNoteById } from "../server-functions/load-notes";
import BasicEditor, { BasicEditorWithInput } from "@/app/components/BasicEditor";
import { updateNote } from "../server-functions/create-note";

export default function ViewAllNotes() {
  const ref = useRef(null)
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [refreshAllNotes, setRefreshAllNotes] = useState(false);

  useEffect(() => {
    async function getNotes() {
      setLoading(true);
      const notes = await getAllNotes();
      setNotes(notes);
      notes.length >= 1 && setSelectedNote(notes[0]);
      setLoading(false);
    }
    !saving && getNotes();
  }, [refreshAllNotes])

  useEffect(() => {
    async function refreshSelectedNote() {
      const note = await getNoteById(selectedNote?.Id);
    }
    !saving && selectedNote && refreshSelectedNote();
  },[saving])

  async function handleSave(e: any) {
    e.preventDefault()
    const currentRefValue = ref.current as any
    setSaving(true)
    const response = await updateNote({
      ...selectedNote,
      Content: currentRefValue.getMarkdown()
    })
    setSaving(false)
  }

  async function handleRefresh() {
    setRefreshAllNotes(!refreshAllNotes)
  }

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
              className="w-full h-98-percent flex flex-col"
            >
              <div
                className="flex flex-row"
              >
                <input
                  type="text" placeholder="Note Title"
                  value={selectedNote?.Title}
                  onChange={(e) => setSelectedNote?.({ ...selectedNote, Title: e.target.value })}
                  className="input input-bordered input-lg w-98-percent m-3"
                />
                <button
                  onClick={handleSave}
                  className="btn btn-primary btn-lg m-3"
                  disabled={saving}
                >
                  Save
                </button>
              </div>
              {
                saving ? 
                <div
                  className="w-full h-full m-auto flex justify-center items-center"
                >
                  <span className="loading loading-spinner loading-lg m-auto"></span>
                </div>
                :
                <BasicEditorWithInput
                  givenMarkdown={selectedNote?.Content}
                  givenRef={ref}
                />
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