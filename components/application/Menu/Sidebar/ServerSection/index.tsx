"use client"
import { useModal } from "@/hooks/use-modal-store"
import { ChannelType, MemberRole } from "@prisma/client"
import { ServerWithMembersWithProfiles } from "@/types"
import { PlusIcon, SettingsIcon } from "lucide-react"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"

interface ServerSectionProps {
    label: string
    role?: MemberRole
    sectionType: "channels" | "members"
    channelType?: ChannelType
    server?: ServerWithMembersWithProfiles
}

const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerSectionProps) => {
    const { onOpen } = useModal()

    return (
        <div className="py-2 flex justify-between items-center">
            <div>
                <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    {label}
                </h4>
            </div>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <TooltipAction label="Criar canal" side="top">
                    <button
                        onClick={() => onOpen("createChannel", { channelType })}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </TooltipAction>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <TooltipAction label="Gerenciar membros" side="top">
                    <button
                        onClick={() => onOpen("members", { server })}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <SettingsIcon className="w-4 h-4" />
                    </button>
                </TooltipAction>
            )}
        </div>
    )
}
 
export default ServerSection