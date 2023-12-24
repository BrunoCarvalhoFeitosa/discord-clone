import { redirect } from "next/navigation"
import { currentProfile } from "@/lib/current-profile"
import { redirectToSignIn } from "@clerk/nextjs"
import { db } from "@/lib/db"
import ServerSidebar from "@/components/application/Menu/Sidebar/ServerSidebar"

const ServerIdLayout = async ({
    children,
    params
}: {
    children: React.ReactNode,
    params: { serverId: string }
}) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        return redirect("/")
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex fixed top-10 flex-col inset-y-0 w-72 h-[calc(100%-40px)] z-[9999]">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="md:pt-10 md:pl-72 h-full rounded-tl-2xl">
                {children}
            </main>
        </div>
    )
}
 
export default ServerIdLayout