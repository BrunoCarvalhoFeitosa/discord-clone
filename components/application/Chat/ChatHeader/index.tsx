import { HashIcon } from "lucide-react"
import { SocketIndicator } from "@/components/application/SocketIndicator"
import MobileToggle from "@/components/mobile/MobileToggle"
import UserAvatar from "@/components/application/UserAvatar"
import ChatVideoButton from "@/components/application/Chat/ChatVideoButton"

interface ChatHeaderProps {
    serverId: string
    name: string
    type: "channel" | "conversation"
    imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
    return (
        <div className="py-2 px-4 flex items-center gap-x-2 h-12 text-md font-semibold border-neutral-200 dark:border-neutral-800 border-b-2">
            <div>
                <MobileToggle serverId={serverId} />
            </div>
            {type === "channel" && (
                <HashIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            )}
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    className="w-6 h-6 mr-2"
                />
            )}
            <div>
                <h2 className="text-md font-semibold text-black dark:text-white">
                    {name}
                </h2>
            </div>
            <div className="ml-auto flex items-center">
                {type === "conversation" && (
                    <ChatVideoButton />
                )}
                <SocketIndicator />
            </div>
        </div>
    )
}
 
export default ChatHeader