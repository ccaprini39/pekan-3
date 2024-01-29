'use server';

import { getXataClient } from "@/src/xata";

export async function deleteNote (id: string) {
  const xata = getXataClient();
  const record = await xata.db.Notes.delete(id);
  const convertedRecord = JSON.parse(JSON.stringify(record)); // convert to plain JS objects
  return convertedRecord;
}