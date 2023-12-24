"use client"
import { useEffect, useState } from "react"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import { Channel } from "@prisma/client"
import { useUser } from "@clerk/nextjs"
import { Loader2Icon } from "lucide-react"
import "@livekit/components-styles"

interface MediaRoomProps {
    chatId: string
    video: boolean
    audio: boolean
}

const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
    const { user } = useUser()
    const [token, setToken] = useState("")

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) {
            return
        }

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
                const data = await response.json()
                setToken(data.token)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [user?.firstName, user?.lastName, chatId])

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2Icon className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Carregando...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}

export default MediaRoom