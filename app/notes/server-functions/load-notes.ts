'use server'
import { getXataClient } from "@/xata"

export async function getAllNotes(){
  const xata = getXataClient()
  const records = await xata.db.Notes.select(["id", "Content", "Title"]).getAll();
  const convertedRecords = JSON.parse(JSON.stringify(records)) // convert to plain JS objects
  return convertedRecords
}

export async function getPaginatedNotes(){
  const xata = getXataClient()
  const records = await xata.db.Notes.getPaginated();
  const convertedRecords = JSON.parse(JSON.stringify(records)) // convert to plain JS objects
  return convertedRecords
}

