'use server';

import { getXataClient } from "@/src/xata";



interface CreateNote {
  Content: string;
  Title: string;
}

export async function createNote(note : CreateNote) {
  console.log("createNote")
  const xata = getXataClient();
  const record = await xata.db.Notes.create({
    Content: note.Content,
    Title: note.Title,
  });
  const convertedRecord = JSON.parse(JSON.stringify(record)); // convert to plain JS objects
  console.log("convertedRecord", convertedRecord)
  return convertedRecord;
}

export async function createBlankNote(){
  const xata = getXataClient();
  const record = await xata.db.Notes.create({
    Content: "",
    Title: "",
  });
  const convertedRecord = JSON.parse(JSON.stringify(record)); // convert to plain JS objects
  return convertedRecord;
}

interface UpdateNote {
  id: string;
  Content: string;
  Title: string;
}

export async function updateNote(note : UpdateNote) {
  const xata = getXataClient();
  const record = await xata.db.Notes.update(note.id, {
    Content: note.Content,
    Title: note.Title,
  });
  const convertedRecord = JSON.parse(JSON.stringify(record)); // convert to plain JS objects
  return convertedRecord;
}