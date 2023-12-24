"use client"
import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/globals/ModeToggle"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import DiscordIcon from "@/public/svg/globals/DiscordIcon"
import { UserButton, useUser } from "@clerk/nextjs"

const Navbar = () => {
    const user = useUser()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <nav className="absolute top-0 py-3 px-3 md:py-4 lg:px-6 xl:px-12 lg:py-5 w-full bg-transparent z-[99]">
            <div className="flex justify-between items-center w-[98%] xl:w-[70%] mx-auto">
                <div>
                    <Link href="/" className="w-fit">
                        <DiscordIcon width="50" height="50" fill="#5865F2" />
                    </Link>
                </div>
                <div className="hidden md:block">
                    <ul className="flex items-center md:gap-x-5 lg:gap-x-10 font-bold text-white">
                        <li className="hover:underline cursor-pointer">
                            Download
                        </li>
                        <li className="hover:underline cursor-pointer">
                            Nitro
                        </li>
                        <li className="hover:underline cursor-pointer">
                            Discover
                        </li>
                        <li className="md:hidden xl:block hover:underline cursor-pointer">
                            Safety
                        </li>
                        <li className="hover:underline cursor-pointer">
                            Support
                        </li>
                        <li className="hover:underline cursor-pointer">
                            Blog
                        </li>
                        <li className="md:hidden xl:block hover:underline cursor-pointer">
                            Carrers
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                        {user.isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <Button size="sm" className="md:hidden lg:flex w-[60px] md:w-[70px] h-8 md:h-10 p-0 rounded-full overflow-hidden bg-white hover:bg-white/80">
                                    <Link href="/sign-in" className="flex justify-center items-center w-full h-full px-4 text-black">
                                        Login
                                    </Link>
                                </Button>
                                <Button size="sm" className="w-[100px] md:w-[120px] h-8 md:h-10 p-0 rounded-full overflow-hidden bg-white hover:bg-white/80">
                                    <Link href="/sign-in" className="flex justify-center items-center w-full h-full px-4 text-black">
                                        Cadastro
                                    </Link>
                                </Button>
                            </div>
                        )}
                        <ModeToggle />
                    </div>
                    <div className="md:hidden">
                        <MenuIcon onClick={() => setIsOpen(true)} className="w-7 h-7 text-white" />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={`fixed top-0 left-0 w-full h-[100dvh] bg-black/80 z-[9999] transition-all ease-in-out duration-1000 ${isOpen ? "translate-x-0 " : "translate-x-full"}`}>
                    <div className="fixed top-0 right-0 w-[60%] xl:w-[40%] h-[100dvh] bg-white dark:bg-[#000] rounded-tl-2xl rounded-bl-2xl z-[99999]">
                        <div className="py-5 w-[80%] h-full mx-auto">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="pb-3 flex justify-end border-b">
                                        <XIcon onClick={() => setIsOpen(false)} />
                                    </div>
                                    <div className="mt-4">
                                        <ul className="flex flex-col gap-y-4">
                                            <li className="py-2 px-4 bg-zinc-100 dark:bg-[#222] rounded-full text-[#404eed] dark:text-[#666] hover:underline">
                                                Início
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Download
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Nitro
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Discover
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Safety
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Support
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Blog
                                            </li>
                                            <li className="px-4 hover:underline">
                                                Careers
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {!user.isSignedIn && (
                                    <div className="flex items-center gap-x-2">
                                        <Button size="sm" className="flex justify-center items-center w-full h-10 p-0 rounded-full text-sm md:text-lg dark:text-[#666] dark:bg-[#222] overflow-hidden">
                                            <Link href="/sign-in" className="flex justify-center items-center w-full h-full px-8">
                                                Acesse sua conta
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
 
export default Navbar