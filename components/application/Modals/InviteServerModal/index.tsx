"use client"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"
import { useOrigin } from "@/hooks/use-origin"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"

export const InviteServerModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data
    const origin = useOrigin()
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    const isModalOpen = isOpen && type === "invite"
    const [copied, setCopied] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const onGenerateNewLink = async () => {
        try {
            setIsLoading(true)

            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite", { server: response.data })
        } catch (error) {
            console.error()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 bg-zinc-100 dark:bg-[#222] text-black dark:text-white overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <Link href="/" className="w-fit">
                        <DiscordIcon
                            width="50"
                            height="50"
                            fill="#333"
                        />
                    </Link>
                    <DialogTitle className="text-2xl font-bold text-center dark:text-[#444]">
                        Convidar amigos
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="text-sm font-bold uppercase text-black dark:text-[#555]">
                        Link de convite do servidor
                    </Label>
                    <div className="mt-2 flex items-center gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="text-black dark:text-white bg-zinc-200 dark:bg-zinc-600/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button
                            size="icon"
                            disabled={isLoading}
                            onClick={onCopy}
                        >
                            {copied ? (
                                <CheckIcon className="w-4 h-4 text-white" />
                            ) : (
                                <CopyIcon className="w-4 h-4 text-white" />
                            )}
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="link"
                            size="sm"
                            disabled={isLoading}
                            onClick={onGenerateNewLink}
                            className="mt-4 px-0 flex items-center gap-x-2 text-xs text-black dark:text-white"
                        >
                            <div>
                                Gerar um novo link
                            </div>
                            <div>
                                <RefreshCwIcon className="w-4 h-4" />
                            </div>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}