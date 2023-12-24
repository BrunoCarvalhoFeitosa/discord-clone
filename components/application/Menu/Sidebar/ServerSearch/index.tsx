"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { SearchIcon } from "lucide-react"

interface ServerSearchProps {
    data: {
        label: string
        type: "channel" | "member",
        data: {
            icon: React.ReactNode
            name: string
            id: string
        }[] | undefined
    }[]
}

const ServerSearch = ({ data }: ServerSearchProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        const openSearchOnKeydown = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", openSearchOnKeydown)

        return () => document.removeEventListener("keydown", openSearchOnKeydown)
    }, [])

    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false)

        if (type === "member") {
            return router.push(`/servers/${params?.serverId}/conversations/${id}`)
        }
        
        if (type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`)
        }
    }

    return (
        <>
            <button
            onClick={() => setOpen(true)}
                className="group py-2 px-2 flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 rounded-md transition"
            >
                <div>
                    <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Buscar
                </div>
                <kbd className="px-1.5 pointer-events-none inline-flex items-center gap-1 select-none rounded border bg-muted font-mono text-[10px] text-muted-foreground ml-auto">
                    <span className="text-xs">CTRL</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Busque todos os canais e membros" />
                <CommandList>
                    <CommandEmpty>
                        Nenhum resultado encontrado
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                    <CommandItem
                                        key={id}
                                        onSelect={() => onClick({ id, type })}
                                    >
                                        <div>
                                            {icon}
                                        </div>
                                        <div>
                                            {name}
                                        </div>
                                    </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}
 
export default ServerSearch