import { currentProfile } from "@/lib/current-profile"
import { UserButton } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/globals/ModeToggle"
import NavigationAction from "@/components/application/Menu/Navigation/NavigationAction"
import NavigationItem from "../NavigationItem"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"
import TooltipAction from "../TooltipAction"

const NavigationSidebar = async () => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    return (
        <div className="flex flex-col items-center space-y-2 w-full h-full py-3 bg-[#E3E5E8] dark:bg-[#1E1F22]">
            <TooltipAction side="right" align="center" label="Mensagens diretas">
                <button className="group flex items-center">
                    <div className="flex justify-center items-center mx-3 w-[48px] h-[48px] rounded-[14px] overflow-hidden bg-primary">
                        <DiscordIcon width="30" height="30" fill="#FFF" />
                    </div>
                </button>
            </TooltipAction>
            <Separator className="mx-auto w-8 h-[2px] bg-zinc-400 dark:bg-[#444] rounded-md" />
            <ScrollArea className="flex-1 w-full">
                <div>
                    {servers.map((server) => (
                        <div key={server.id} className="mb-4">
                            <NavigationItem
                                id={server.id}
                                name={server.name}
                                imageUrl={server.imageUrl}
                            />
                        </div>
                    ))}
                    <NavigationAction />
                </div>
            </ScrollArea>
            <div className="pb-3 mt-auto flex flex-col items-center gap-y-2">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    signInUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "w-[48px] h-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}
 
export default NavigationSidebar