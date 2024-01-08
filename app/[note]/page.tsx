'use client'

import { useRouter } from 'next/navigation';
import { NoteEditor } from "@/app/components/BasicEditor";



export default function NotePage({ params }: { params: { note: string } }) {

  return (
    <div
      className="h-full w-full max-h-full max-w-full"
    >
      <NoteEditor
        deleteNote={() => { }}
        noteId={params.note}
      />
    </div>
  )
}