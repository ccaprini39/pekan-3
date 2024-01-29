'use server'

import { getXataClient } from "@/src/xata";


export async function getAllNotes(){
  const xata = getXataClient()
  const records = await xata.db.Notes.select(["id", "Content", "Title"]).getAll();
  const convertedRecords = JSON.parse(JSON.stringify(records)) // convert to plain JS objects
  return convertedRecords
}

export async function getAllNoteTitles(){
  const xata = getXataClient()
  const records = await xata.db.Notes.select(["id", "Title"]).getAll();
  const convertedRecords = JSON.parse(JSON.stringify(records)) // convert to plain JS objects
  return convertedRecords
}

export async function getPaginatedNotes(){
  const xata = getXataClient()
  const records = await xata.db.Notes.getPaginated();
  const convertedRecords = JSON.parse(JSON.stringify(records)) // convert to plain JS objects
  return convertedRecords
}

export async function getNoteById(id: string){
  const xata = getXataClient()
  const record = await xata.db.Notes.read(id);
  const convertedRecord = JSON.parse(JSON.stringify(record)) // convert to plain JS objects
  return convertedRecord
}