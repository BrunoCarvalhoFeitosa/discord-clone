import { redirect } from "next/navigation"
import { currentProfile } from "@/lib/current-profile"
import { ChannelType, MemberRole } from "@prisma/client"
import { db } from "@/lib/db"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { HashIcon, MicIcon, ShieldAlert, ShieldCheckIcon, VideoIcon } from "lucide-react"
import ServerHeader from "@/components/application/Menu/Sidebar/ServerHeader"
import ServerSearch from "@/components/application/Menu/Sidebar/ServerSearch"
import ServerSection from "@/components/application/Menu/Sidebar/ServerSection"
import ServerChannel from "@/components/application/Menu/Sidebar/ServerChannel"
import ServerMember from "@/components/application/Menu/Sidebar/ServerMember"

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [ChannelType.TEXT]: <HashIcon className="mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <MicIcon className="mr-2 w-4 h-4" />,
    [ChannelType.VIDEO]: <VideoIcon className="mr-2 w-4 h-4" />
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheckIcon className="mr-2 w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-rose-500" />
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    })
    
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect("/")
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role

    return (
        <div className="flex flex-col w-full h-full text-primary bg-zinc-100 dark:bg-[#2B2D31] overflow-hidden">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="px-3 flex-1">
                <div className="mt-2">
                    <ServerSearch data={[
                        {
                            label: "Canais de texto",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Canais de voz",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Canais de vídeo",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Membros",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role]
                            }))
                        }
                    ]} />
                </div>
                <div>
                    <Separator className="bg-zinc-400 dark:bg-[#444] rounded-md" />
                </div>
                <div className="mt-2">
                    {!!textChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Canais de texto"
                                role={role}
                                sectionType="channels"
                                channelType={ChannelType.TEXT}
                            />
                            <div className="space-y-[2px]">
                                {textChannels?.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        server={server}
                                        role={role}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!!audioChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Canais de voz"
                                role={role}
                                sectionType="channels"
                                channelType={ChannelType.AUDIO}
                            />
                            <div className="space-y-[2px]">
                                {audioChannels?.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        server={server}
                                        role={role}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!!videoChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Canais de vídeo"
                                role={role}
                                sectionType="channels"
                                channelType={ChannelType.VIDEO}
                            />
                            <div className="space-y-[2px]">
                                {videoChannels?.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        server={server}
                                        role={role}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!!members?.length && (
                        <div className="mb-2">
                            <ServerSection
                                label="Membros"
                                role={role}
                                sectionType="members"
                                server={server}
                            />
                            <div className="space-y-[2px]">
                                {members?.map((member) => (
                                    <ServerMember
                                        key={member.id}
                                        member={member}
                                        server={server}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
 
export default ServerSidebar