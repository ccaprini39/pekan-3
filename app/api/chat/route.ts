import { StreamingTextResponse, OpenAIStream } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const auth = `Bearer ${process.env.OPENAI_API_KEY}`;

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  try {
    
    const response = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      stream: true,
      messages: messages.map((message : any) => ({
        content: message.content,
        role: message.role,
      })),
    })
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error)
    return new Response('error', { status: 500 }); // Return a Response object instead of a string
  }

}