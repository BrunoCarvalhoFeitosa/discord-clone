"use client"
import { HashIcon } from "lucide-react"

interface ChatWelcomeProps {
    type: "channel" | "conversation"
    name: string
}

const ChatWelcome = ({ type, name }: ChatWelcomeProps) => {
    return (
        <div className="space-y-2 mx-4 mb-4">
            {type === "channel" && (
                <div className="flex justify-center items-center w-[75px] h-[75px] bg-zinc-500 dark:bg-zinc-700 rounded-full">
                    <HashIcon className="w-12 h-12 text-white" />
                </div>
            )}
            <div>
                <h4 className="text-xl md:text-3xl font-bold">
                    {type === "channel" ? "Bem-vindo a #" : ""}{name}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {type === "channel"
                        ? `Este é o começo do canal ${name}.`
                        : `Este é o começo de sua conversa com ${name}.`
                    }
                </p>
            </div>
        </div>
    )
}
 
export default ChatWelcome