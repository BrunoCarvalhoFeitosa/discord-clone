"use client"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"

interface NavigationItemProps {
    id: string
    imageUrl: string
    name: string
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <TooltipAction
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-black dark:bg-white rounded-r-full transition-all w-[4px] h-[14px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-full group-hover:h-[36px]" : "h-[8px]",

                )} />
                <div className={cn(
                    "group relative flex mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] overflow-hidden transition-all",
                    params?.serverId === id && "bg-white/10 text-primary rounded-[16px]"
                )}>
                    <Image
                        fill
                        src={imageUrl}
                        alt="Canal"
                        className="object-cover"
                    />
                </div>
            </button>
        </TooltipAction>
    )
}
 
export default NavigationItem