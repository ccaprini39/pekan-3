'use client'

import { useRouter } from 'next/navigation';
import { NoteEditor } from "@/app/components/BasicEditor";
import { deleteNote } from "../../notes-new/server-functions/delete-note";

export default function NotePage({ params }: { params: { note: string } }) {
  const router = useRouter()
  async function handleDelete() {
    await deleteNote(params.note)
    router.push('/notes')
  }

  return (
    <div
      className="h-full w-full max-h-full max-w-full"
    >
      <NoteEditor
        deleteNote={handleDelete}
        noteId={params.note}
      />
    </div>
  )
}