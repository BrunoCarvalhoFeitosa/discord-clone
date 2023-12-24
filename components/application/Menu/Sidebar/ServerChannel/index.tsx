"use client"

import { cn } from "@/lib/utils"
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { EditIcon, HashIcon, LockIcon, MicIcon, TrashIcon, VideoIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ModalType, useModal } from "@/hooks/use-modal-store"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"

interface ServerChannelProps {
    channel: Channel
    server: Server
    role?: MemberRole
}

const iconMap = {
    [ChannelType.TEXT]: HashIcon,
    [ChannelType.AUDIO]: MicIcon,
    [ChannelType.VIDEO]: VideoIcon
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
    const router = useRouter()
    const params = useParams()
    const { onOpen } = useModal()
    const Icon = iconMap[channel.type]

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

    const onAction = (event: React.MouseEvent, action: ModalType) => {
        event.stopPropagation()
        onOpen(action, { channel, server })
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "group py-2 px-2 mb-1 flex justify-between items-center gap-x-2 w-full rounded-md hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
                params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <div className="flex items-center gap-x-2">
                <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                <div className={cn(
                    "line-clamp-1 text-sm font-semibold text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                    params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}>
                    {channel.name}
                </div>
            </div>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="flex items-center gap-x-2">
                    <TooltipAction label="Editar">
                        <EditIcon
                            onClick={(event) => onAction(event, "editChannel")}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        />
                    </TooltipAction>
                    <TooltipAction label="Excluir">
                        <TrashIcon
                            onClick={(event) => onAction(event, "deleteChannel")}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        />
                    </TooltipAction>
                </div>
            )}
            {channel.name === "general" && (
                <LockIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            )}
        </button>
    )
}
 
export default ServerChannel