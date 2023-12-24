import { redirect } from "next/navigation"
import { currentProfile } from "@/lib/current-profile"
import { redirectToSignIn } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { ChannelType } from "@prisma/client"
import ChatHeader from "@/components/application/Chat/ChatHeader"
import ChatInput from "@/components/application/Chat/ChatInput"
import ChatMessages from "@/components/application/Chat/ChatMessages"
import MediaRoom from "@/components/application/MediaRoom"

interface ChannelIdPageProps {
    params: {
        serverId: string
        channelId: string
    }
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirectToSignIn()
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    })

    if (!channel || !member) {
        redirect("/create-server")
    }
    
    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#313338]">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        name={channel.name}
                        member={member}
                        chatId={channel.id}
                        apiUrl="/api/messages"
                        paramKey="channelId"
                        paramValue={channel.id}
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                        socketUrl="/api/socket/messages"
                        type="channel"
                    />
                    <ChatInput
                        type="channel"
                        apiUrl="/api/socket/messages"
                        name={channel.name}
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )}
        </div>
    )
}
 
export default ChannelIdPage