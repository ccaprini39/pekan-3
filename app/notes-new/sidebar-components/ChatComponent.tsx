import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  console.log(messages)
  return (
    <div className="mx-auto w-full flex flex-col justify-between stretch h-full max-h-full overflow-hidden">
      <div
        className="flex-grow flex flex-col overflow-auto"
      >
        {messages.map((message, index) => {
          let last = false;
          if (index === messages.length - 1) last = true;
          return (
            <div
              key={message.id}
              className='border border-gray-500 rounded p-1'
            >
              <div
                className='text-sm font-bold opacity-50'
              >
                {message.role}
              </div>

              {message.content}
            </div>
          )
        }
        )}
      </div>

      <form
        className='flex flex-row w-full '
        onSubmit={handleSubmit}
      >
        <label
          className='flex-grow'
        >
          <input
            className="w-full h-full border border-gray-300 rounded shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <Button 
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
}