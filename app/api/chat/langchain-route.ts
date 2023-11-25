// import { StreamingTextResponse, LangChainStream, Message } from 'ai'
// import { ChatOpenAI } from 'langchain/chat_models/openai'
// import { SystemChatMessage, AIChatMessage, HumanChatMessage } from 'langchain/schema'

// export const runtime = 'edge'

// export async function POST(req: Request) {
//   const { messages } = await req.json()

//   const { stream, handlers } = LangChainStream()

//   const llm = new ChatOpenAI({
//     modelName: 'gpt-4',
//     streaming: true,
//     callbacks: [handlers],
//     timeout: 20000,
//   })

//   llm
//     .call(
//       (messages as Message[]).map(m =>{
//         if (m.role == 'system') return new SystemChatMessage(m.content)
//         if (m.role == 'user') return new HumanChatMessage(m.content)
//         else return new AIChatMessage(m.content)
//       })
//     )
//     .catch(console.error)

//   return new StreamingTextResponse(stream)
// }

export async function GET(req: Request) {
  return new Response('Langchain dependency issue, can resolvbe later!')
}