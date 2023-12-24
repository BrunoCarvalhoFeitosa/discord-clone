"use client"
import { useSocket } from "@/components/providers/socket-provider"

export const SocketIndicator = () => {
    const { isConnected } = useSocket()

    if (!isConnected) {
        return (
            <div className="w-3 h-3 text-white bg-yellow-600 rounded-full border-none animate-pulse" />
        )
    }

    return (
        <div className="w-3 h-3 text-white bg-emerald-600 rounded-full border-none animate-pulse" />
    )
}