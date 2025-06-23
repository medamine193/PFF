import { cn } from "@/lib/utils"

type Message = {
  id: number
  sender: "patient" | "doctor"
  content: string
  timestamp: string
}

interface ChatBoxProps {
  messages: Message[]
}

export default function ChatBox({ messages }: ChatBoxProps) {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.sender === "patient" ? "justify-end" : "justify-start")}>
          <div
            className={cn(
              "max-w-[75%] rounded-lg p-4",
              message.sender === "patient"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white text-slate-900 rounded-bl-none border",
            )}
          >
            <p className="text-sm">{message.content}</p>
            <p className={cn("text-xs mt-1", message.sender === "patient" ? "text-blue-100" : "text-slate-500")}>
              {message.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
