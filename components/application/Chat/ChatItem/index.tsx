"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { useModal } from "@/hooks/use-modal-store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Member, MemberRole, Profile } from "@prisma/client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EditIcon, FileIcon, ShieldAlertIcon, ShieldCheckIcon, TrashIcon } from "lucide-react"
import UserAvatar from "@/components/application/UserAvatar"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"

interface ChatItemProps {
    id: string
    content: string
    member: Member & {
        profile: Profile
    }
    timestamp: string
    fileUrl: string | null
    deleted: boolean
    currentMember: Member
    isUpdated: boolean
    socketUrl: string
    socketQuery: Record<string, string>
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheckIcon className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlertIcon className="h-4 w-4 ml-2 text-rose-500" />,
}

const formSchema = z.object({
    content: z.string().min(1)
})

const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}: ChatItemProps) => {
    const { onOpen } = useModal()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const router = useRouter()
    const params = useParams()
    const fileType = fileUrl?.split(".").pop()
    const isAdmin = currentMember.role === MemberRole.ADMIN
    const isModerator = currentMember.role === MemberRole.MODERATOR
    const isOwner = currentMember.id === member.id
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
    const canEditMessage = !deleted && isOwner && !fileUrl
    const isPDF = fileType === "pdf" && fileUrl
    const isImage = !isPDF && fileUrl
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    })

    const isLoading = form.formState.isSubmitting

    const onMemberClick = () => {
        if (member.id === currentMember.id) {
            return
        }

        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            })

            await axios.patch(url, values)
            form.reset()
            setIsEditing(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        form.reset({
            content: content
        })
    }, [content])

    useEffect(() => {
        const handleCloseEspape = (event: any) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false)
            }
        }

        window.addEventListener("keydown", handleCloseEspape)

        return () => window.removeEventListener("keydown", handleCloseEspape)
    }, [])

    return (
        <div className="group relative p-4 flex items-center w-full hover:bg-black/5 transition">
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-baseline">
                            <div onClick={onMemberClick}>
                                <p className="text-sm font-semibold hover:underline cursor-pointer">
                                    {member.profile.name}
                                </p>
                            </div>
                            <div>
                                <TooltipAction label={member.role}>
                                    {roleIconMap[member.role]}
                                </TooltipAction>
                            </div>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square mt-2 flex items-center w-48 h-48 rounded-md bg-secondary border-none overflow-hidden"
                        >
                            <Image
                                fill
                                src={fileUrl}
                                alt={content}
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative p-2 mt-2 flex items-center bg-indigo-200 rounded-md">
                            <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                            <a href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 hover:underline"
                            >
                                Arquivo PDF
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p className={cn(
                            "text-sm text-zinc-600 dark:text-zinc-300",
                            deleted && "mt-1 text-xs italic text-zinc-500 dark:text-zinc-400"
                        )}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (editado)
                                </span>
                            )}
                        </p>
                    )}

                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex items-center gap-x-2 pt-2 w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 text-zinc-600 dark:text-zinc-200 bg-zinc-200/90 dark:bg-zinc-700/75 border-nnone border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                        placeholder="Editar mensagem"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={isLoading}
                                    size="sm"
                                    variant="primary"
                                >
                                    Salvar
                                </Button>
                            </form>
                            <div className="mt-1 text-[10px] text-zinc-400">
                                Aperte ESC para cancelar ou ENTER para salvar.
                            </div>
                        </Form>
                    )}
                </div>
                {canDeleteMessage && (
                    <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <TooltipAction label="Edit">
                        <EditIcon
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                            onClick={() => setIsEditing(true)}
                        />
                        </TooltipAction>
                    )}
                    <TooltipAction label="Delete">
                        <TrashIcon
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                            onClick={() => onOpen("deleteMessage", { 
                                apiUrl: `${socketUrl}/${id}`,
                                query: socketQuery,
                            })}
                        />
                    </TooltipAction>
                    </div>
                )}
            </div>
        </div>
    )
}
 
export default ChatItem