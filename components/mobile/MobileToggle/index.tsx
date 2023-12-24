import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import NavigationSidebar from "@/components/application/Menu/Navigation/NavigationSidebar"
import ServerSidebar from "@/components/application/Menu/Sidebar/ServerSidebar"

const MobileToggle = ({ serverId }: { serverId: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <div>
                    <ServerSidebar serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle