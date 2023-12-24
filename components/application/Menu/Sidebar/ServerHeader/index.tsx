"use client"
import { MemberRole } from "@prisma/client"
import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, LogOutIcon, PlusCircleIcon, SettingsIcon, TrashIcon, UserPlus, UsersIcon } from "lucide-react"

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles
    role?: MemberRole 
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
    const { onOpen } = useModal()
    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="px-3 w-full h-12 flex md:justify-between items-center gap-x-2 md:gap-x-0 text-md font-semibold border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    <div className="truncate">
                        {server.name}
                    </div>
                    <div>
                        <ChevronDownIcon className="w-5 h-5" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[270px] text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="flex justify-between items-center px-3 py-2 text-indigo-600 dark:text-indigo-400 cursor-pointer"
                    >
                        <div>
                            Convidar pessoas
                        </div>
                        <div>
                            <UserPlus className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("editServer", { server })}
                        className="flex justify-between items-center px-3 py-2 cursor-pointer"
                    >
                        <div>
                            Configurações do servidor
                        </div>
                        <div>
                            <SettingsIcon className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { server })}
                        className="flex justify-between items-center px-3 py-2 cursor-pointer"
                    >
                        <div>
                            Gerenciar membros
                        </div>
                        <div>
                            <UsersIcon className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("createChannel")}
                        className="flex justify-between items-center px-3 py-2 cursor-pointer"
                    >
                        <div>
                            Criar canal
                        </div>
                        <div>
                            <PlusCircleIcon className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("deleteServer", { server })}
                        className="flex justify-between items-center px-3 py-2 text-rose-500 cursor-pointer"
                    >
                        <div>
                            Deletar servidor
                        </div>
                        <div>
                            <TrashIcon className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("leaveServer", { server })}
                        className="flex justify-between items-center px-3 py-2 text-rose-500 cursor-pointer"
                    >
                        <div>
                            Sair do servidor
                        </div>
                        <div>
                            <LogOutIcon className="w-4 h-4" />
                        </div>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
 
export default ServerHeader