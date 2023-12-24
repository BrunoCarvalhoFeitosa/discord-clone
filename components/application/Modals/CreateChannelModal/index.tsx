"use client"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import qs from "query-string"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/use-modal-store"
import { ChannelType } from "@prisma/client"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"

const formSchema = z.object({
    name: z.string().min(1, {
      message: "O nome do canal é obrigatório."
    }).refine(
      name => name !== "general",
      {
        message: "O nome do canal não pode ser 'general'."
      }
    ),
    type: z.nativeEnum(ChannelType)
  })

export const CreateChannelModal = () => {
    const router = useRouter()
    const params = useParams()
    const { isOpen, onClose, type, data } = useModal()
    const { channelType } = data
    const isModalOpen = isOpen && type === "createChannel"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType || ChannelType.TEXT,
        }
    })

    useEffect(() => {
        if (channelType) {
            form.setValue("type", channelType);
        } else {
            form.setValue("type", ChannelType.TEXT);
        }
    }, [channelType, form])

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            })

            await axios.post(url, values)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
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
                        Criar canal
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="px-6 space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold uppercase text-black dark:text-[#555]">
                                            Nome do canal
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="text-black dark:text-white bg-zinc-200 dark:bg-zinc-600/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Insira o nome do canal"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold uppercase text-black dark:text-[#555]">
                                            Tipo do canal
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 text-black dark:text-white bg-zinc-200 dark:bg-zinc-600/50 outline-none">
                                                    <SelectValue placeholder="Selecione um tipo de canal" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.values(ChannelType).map((type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type}
                                                            className="capitalize"
                                                        >
                                                            {type.toLowerCase()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="py-4 px-6 bg-gray-100 dark:dark:bg-[#333]">
                            <Button variant="primary" disabled={isLoading}>
                                Criar canal
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}