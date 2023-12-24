"use client"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { ShieldAlert, ShieldCheckIcon } from "lucide-react"
import UserAvatar from "@/components/application/UserAvatar"

interface ServerMemberProps {
    member: Member & { profile: Profile }
    server: Server
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheckIcon className="ml-2 w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="ml-2 w-4 h-4 text-rose-500" />
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
    const router = useRouter()
    const params = useParams()
    const icon = roleIconMap[member.role]

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "group py-2 px-2 mb-1 flex items-center gap-x-2 w-full rounded-md hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
                params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <div>
                <UserAvatar
                    src={member.profile.imageUrl}
                    className="w-8 h-8 md:w-8 md:h-8"
                />
            </div>
            <div>
                <p className={cn(
                    "truncate w-[80%] md:w-full text-sm font-semibold text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition",
                    params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}>
                    {member.profile.name}
                </p>
            </div>
            <div>
                {icon}
            </div>
        </button>
    )
}
 
export default ServerMember