import { ChatCompletionCreateParams } from "openai/resources";
import { StreamingTextResponse, OpenAIStream } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { getXataClient } from "@/xata";

const xata = getXataClient();

const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'full_text_search',
    description: 'Full text search on a branch',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query'
        },
        fuzziness: {
          type: 'number',
          description: 'Maximum levenshtein distance for fuzzy search, minimum 0, maximum 2'
        }
      },
      required: ['query']
    }
  }
];

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const auth = `Bearer ${process.env.OPENAI_API_KEY}`;

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  //I need to find the message with the system message and add to it
  // this string:
  //Reply to the user about the data in the database, do not reply about other topics.
  //Only use the functions you have been provided with, and use them in the way they are documented.
  const messagesExpanded = messages.map((message : any) => {
    if(message.role === "system"){
      return {
        ...message,
        content: `${message.content}\nReply to the user about the data in the database, strongly prefer that you reply about the data, but you can respond to any question or conversation.\n
        Only use the functions you have been provided with, and use them in the way they are documented.\n
        For each reference to a document or title you find matching, include the document title and the url.\n
        `
      }
    } else {
      return message
    }
  })
  try {
    
    const response = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      stream: true,
      messages: messagesExpanded.map((message : any) => ({
        content: message.content,
        role: message.role,
      })),
      functions
    })
    const stream = OpenAIStream(response, {
      experimental_onFunctionCall: async ({ name, arguments: args }, createFunctionCallMessages) => {
        switch (name) {
          case 'full_text_search': {
            // const response = await api.searchAndFilter.searchBranch({
            //   workspace,
            //   region,
            //   database,
            //   branch,
            //   query: args.query as string,
            //   fuzziness: args.fuzziness as number
            // });
            const records = await xata.search.all(args.query as string, {
              tables: [
                {table: "Notes"}
              ],
              fuzziness: args.fuzziness as number
            })
     
            const newMessages = createFunctionCallMessages(records as any);
     
            return openai.createChatCompletion({
              messages: [...messages, ...newMessages],
              stream: true,
              model: "gpt-4-1106-preview",
              functions
            });
          }
          default:
            throw new Error('Unknown OpenAI function call name');
        }
      }
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error)
    return new Response('error', { status: 500 }); // Return a Response object instead of a string
  }
}