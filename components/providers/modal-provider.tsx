"use client"
import { useEffect, useState } from "react"
import { CreateServerModal } from "@/components/application/Modals/CreateServerModal"
import { InviteServerModal } from "@/components/application/Modals/InviteServerModal"
import { EditServerModal } from "@/components/application/Modals/EditServerModal"
import { MembersServerModal } from "@/components/application/Modals/MembersServerModal"
import { CreateChannelModal } from "@/components/application/Modals/CreateChannelModal"
import { LeaveServerModal } from "@/components/application/Modals/LeaveServerModal"
import { DeleteServerModal } from "@/components/application/Modals/DeleteServerModal"
import { DeleteChannelModal } from "@/components/application/Modals/DeleteChannelModal"
import { EditChannelModal } from "@/components/application/Modals/EditChannelModal"
import { MessageFileModal } from "@/components/application/Modals/MessageFileModal"
import { DeleteMessageModal } from "@/components/application/Modals/DeleteMessageModal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    
    return (
        <>
            <CreateServerModal />
            <InviteServerModal />
            <EditServerModal />
            <MembersServerModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <MessageFileModal/>
            <DeleteMessageModal />
        </>
    )
}