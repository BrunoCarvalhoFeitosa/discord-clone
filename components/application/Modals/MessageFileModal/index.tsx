"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import * as z from "zod"
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/application/FileUpload"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "O arquivo é obrigatório."
    })
})

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { apiUrl, query } = data
    const router = useRouter()
    const isModalOpen = isOpen && type === "messageFile"
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })


            await axios.post(url, {
                ...values,
                content: values.fileUrl
            })
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 bg-zinc-100 dark:bg-[#222] text-black dark:text-white overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <Link href="/" className="w-fit">
                        <DiscordIcon width="50" height="50" fill="#333" />
                    </Link>
                    <DialogTitle className="text-2xl font-bold text-center dark:text-[#444]">
                        Adicionar um anexo
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#666]">
                        Envie um arquivo jpg ou pdf como mensagem.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="px-6 space-y-8">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl className="flex justify-center mx-auto w-full">
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="py-4 px-6 bg-gray-100 dark:dark:bg-[#333]">
                            <Button variant="primary" disabled={isLoading}>
                                Enviar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}