"use client"
import { useState } from "react"
import qs from "query-string"
import Link from "next/link"
import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"

export const DeleteMessageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "deleteMessage"
    const { apiUrl, query } = data
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })

            await axios.delete(url)
            onClose()
        } catch (error) {
            console.error(error)
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
                        Deletar mensagem
                    </DialogTitle>
                    <DialogDescription className="text-center dark:text-[#666]">
                        Você tem certeza que deseja deletare mensagem? <br />
                        Esta ação será permanente e sua mensagem será removida.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="py-4 px-6 bg-gray-100 dark:dark:bg-[#333]">
                    <div className="flex justify-between items-center w-full">
                        <Button
                            variant="ghost"
                            disabled={isLoading}
                            onClick={onClose}
                            className="dark:text-white"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoading}
                            onClick={onClick}
                        >
                            Deletar
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}