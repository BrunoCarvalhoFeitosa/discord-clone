"use client"
import { useState } from "react"
import Link from "next/link"
import qs from "query-string"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckIcon, GavelIcon, Loader2Icon, MoreVerticalIcon, ShieldAlertIcon, ShieldCheckIcon, ShieldIcon, ShieldQuestionIcon } from "lucide-react"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"
import UserAvatar from "@/components/application/UserAvatar"

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheckIcon className="ml-2 w-4 h-4 text-indigo-500" />,
    "ADMIN": <ShieldAlertIcon className="ml-2 w-4 h-4 text-rose-500" />
}

export const MembersServerModal = () => {
    const [loadingId, setLoadingId] = useState<string>("")
    const router = useRouter()
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data as { server: ServerWithMembersWithProfiles }
    const isModalOpen = isOpen && type === "members"

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId)

            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                serverId: server?.id,
                }
            })
    
            const response = await axios.patch(url, { role })
            router.refresh()
            onOpen("members", { server: response.data })
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId("")
        }
    }

    const onKick = async (memberId: string) => {
        try {
          setLoadingId(memberId)
          const url = qs.stringifyUrl({
            url: `/api/members/${memberId}`,
            query: {
              serverId: server?.id,
            }
          })
    
          const response = await axios.delete(url)
          router.refresh()
          onOpen("members", { server: response.data })
        } catch (error) {
          console.log(error)
        } finally {
          setLoadingId("")
        }
      }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-100 dark:bg-[#222] text-black dark:text-white overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <Link href="/" className="w-fit">
                        <DiscordIcon
                            width="50"
                            height="50"
                            fill="#333"
                        />
                    </Link>
                    <DialogTitle className="text-2xl font-bold text-center dark:text-[#444]">
                        Gerenciar membros
                    </DialogTitle>
                    <DialogDescription className="text-center text-black dark:text-[#555]">
                        {server?.members?.length <= 1 ? `${server?.members?.length} membro` : `${server?.members?.length} membros`} 
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 pr-6 max-h-[420px]">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="mb-6 flex items-center gap-x-2">
                            <div>
                                <UserAvatar src={member.profile.imageUrl} />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <div className="flex items-center gap-x-1 text-sm font-semibold dark:text-[#666]">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <div>
                                    <p className="text-xs dark:text-[#AAA]">
                                        {member.profile.name}
                                    </p>
                                </div>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="outline-none border-none">
                                            <MoreVerticalIcon className="w-4 h-4 text-zinc-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center gap-x-2">
                                                    <ShieldQuestionIcon className="w-4 h-4" />
                                                    <div>Papel</div>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem
                                                            onClick={() => onRoleChange(member.id, "GUEST")}
                                                            className="flex items-center gap-x-2"
                                                        >
                                                            <ShieldIcon className="w-4 h-4" />
                                                            <div>Convidado</div>
                                                            {member.role === "GUEST" && (
                                                                <CheckIcon className="w-4 h-4 ml-3" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onRoleChange(member.id, "MODERATOR")}
                                                            className="flex items-center gap-x-2"
                                                        >
                                                            <ShieldCheckIcon className="w-4 h-4" />
                                                            <div>Moderador</div>
                                                            {member.role === "MODERATOR" && (
                                                                <CheckIcon className="w-4 h-4 ml-3" />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => onKick(member.id)}
                                                className="flex items-center gap-x-2"
                                            >
                                                <GavelIcon className="w-4 h-4" />
                                                <div>Remover</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2Icon className="animate-spin text-zinc-500 w-4 h-4 ml-auto" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}