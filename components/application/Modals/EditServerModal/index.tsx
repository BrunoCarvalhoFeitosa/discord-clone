"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/application/FileUpload"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"
import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "O nome do servidor é obrigatório."
    }),
    imageUrl: z.string().min(1, {
        message: "A imagem do servidor é obrigatória."
    })
})

export const EditServerModal = () => {
    const router = useRouter()
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "editServer"
    const { server } = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name)
            form.setValue("imageUrl", server.imageUrl)
        }
    }, [server, form])

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 bg-zinc-100 dark:bg-[#222] text-black dark:text-white overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <Link href="/" className="w-fit">
                        <DiscordIcon width="50" height="50" fill="#333" />
                    </Link>
                    <DialogTitle className="text-2xl font-bold text-center dark:text-[#444]">
                        Customize seu servidor
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#666]">
                        Dê ao seu servidor sua personalidade e características.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="px-6 space-y-8">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl className="flex justify-center mx-auto w-full">
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold uppercase text-black dark:text-[#555]">
                                            Nome do servidor
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="text-black dark:text-white bg-zinc-200 dark:bg-zinc-600/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Insira o nome do servidor"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="py-4 px-6 bg-gray-100 dark:dark:bg-[#333]">
                            <Button variant="primary" disabled={isLoading}>
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}