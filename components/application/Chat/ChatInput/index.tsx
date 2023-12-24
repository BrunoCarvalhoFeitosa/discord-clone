"use client"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import EmojiPicker from "@/components/application/EmojiPicker"
import { useRouter } from "next/navigation"

interface ChatInputProps {
    type: "conversation" | "channel"
    apiUrl: string
    name: string
    query: Record<string, any>
}

const formSchema = z.object({
    content: z.string().min(1)
})

const ChatInput = ({ apiUrl, name, query, type }: ChatInputProps) => {
    const { onOpen } = useModal()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            })

            await axios.post(url, values)
            form.reset()
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="sticky bottom-0 w-full z-10">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6 bg-zinc-200 dark:bg-zinc-800">
                                    <button
                                        type="button"
                                        className="absolute top-7 left-8 p-1 flex justify-center items-center w-[24px] h-[24px] rounded-full bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                    >
                                        <PlusIcon className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className="py-6 px-14 text-zinc-600 dark:text-zinc-200 bg-zinc-300/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder={`Conversar em ${type === "conversation" ? name : "#" + name}`}
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
 
export default ChatInput