import { getXataClient } from "@/src/xata";

async function loadAssistants(){
  const client = await getXataClient()
  const assistants = await client.db.Assistants.findMany()
}