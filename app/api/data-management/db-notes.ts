'use server'

export async function saveNote(note: NoteObject) : Promise<boolean> {
  const url = 'https://collin-caprini-s-workspace-fs8hhd.us-east-1.xata.sh/db/pekan-3:main/tables/notes/data?columns=id'
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(note)
  }
  console.log(options)
  try {
    const response = await fetch(url, options)
    //console.log(response)
    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(response.statusText)
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}


export interface NoteObject {
  user: string;
  title: string;
  note: string;
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + process.env.XATA_API_KEY
}

