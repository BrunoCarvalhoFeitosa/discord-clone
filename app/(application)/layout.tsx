import NavigationSidebar from "@/components/application/Menu/Navigation/NavigationSidebar"
import { ModeToggle } from "@/components/globals/ModeToggle"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="hidden md:block fixed top-0 px-4 w-full h-10 bg-zinc-200 dark:bg-[#1E1F22]" />
            <div className="hidden fixed top-10 md:flex flex-col flex-1 inset-y-0 w-[72px] z-[99]">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    )
}
 
export default MainLayout