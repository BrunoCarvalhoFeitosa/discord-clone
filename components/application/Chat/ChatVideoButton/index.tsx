"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"
import { VideoIcon, VideoOffIcon } from "lucide-react"

const ChatVideoButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isVideo = searchParams?.get("video")
    const Icon = isVideo ? VideoOffIcon : VideoIcon
    const tooltipLabel = isVideo ? "Encerrar chamada de vídeo" : "Iniciar chamada de vídeo"

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true })

        router.push(url)
    }

    return (
        <TooltipAction side="bottom" label={tooltipLabel}>
            <button
                className="mr-4 hover:opacity-75 transition"
                onClick={onClick}
            >
                <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </TooltipAction>
    )
}
 
export default ChatVideoButton