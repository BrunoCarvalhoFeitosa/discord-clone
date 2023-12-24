"use client"
import Link from "next/link"
import { useMediaQuery } from "usehooks-ts"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/variants"
import { BotIcon, DownloadIcon, GlobeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import FirstHeadingBackground from "@/public/svg/main/FirstHeadingBackground"
import SecondHeadingBackground from "@/public/svg/main/SecondHeadingBackground"
import ThirdHeadingBackground from "@/public/svg/main/ThirdHeadingBackground"
import { useUser } from "@clerk/nextjs"

const Heading = () => {
    const user = useUser()
    const isMobile = useMediaQuery("(max-width: 767px)")
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1139px)")
    const isDesktop = useMediaQuery("(min-width: 1140px)")

    return (
        <div className="relative w-full pt-32 md:pt-44 xl:pt-80 px-4 md:px-8 xl:px-0 xl:pr-10 bg-primary overflow-hidden">
            <div className="relative flex xs:flex-col xl:flex-row justify-between items-center gap-x-14 z-20">
                <motion.div
                    variants={fadeIn("right", 2.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="mt-12 md:mt-0 -ml-44 xl:ml-0 md:relative top-7 md:top-[70px] xl:top-7 order-2 xl:order-none"
                >
                    {isMobile && (
                        <FirstHeadingBackground width="400" height="200" />
                    )}
                    {isTablet && (
                        <FirstHeadingBackground width="540" height="405" />
                    )}
                    {isDesktop && (
                        <FirstHeadingBackground width="620" height="360" />
                    )}
                </motion.div>
                <div className="order-1 xl:order-none xl:relative -top-28 flex flex-col gap-y-12">
                    <div className="xl:w-[65vh] text-center">
                        <motion.h2
                            variants={fadeIn("down", 0.5)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="font-ABCGintoNordBold text-2xl md:text-6xl font-bold uppercase text-white"
                        >
                            Imagine um lugar...
                        </motion.h2>
                        <motion.p
                            className="mt-6 text-lg text-center text-white"
                            variants={fadeIn("up", 1)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            …onde você possa pertencer a um clube escolar, um grupo de gamers, ou uma comunidade artística mundial. Onde você e alguns amigos possam passar um tempo juntos. Um lugar que torna fácil conversar todos os dias e socializar com mais frequência.
                        </motion.p>
                    </div>
                    <div className="flex xs:flex-col md:flex-row gap-y-4 xl:gap-y-0 items-start md:items-center md:justify-center gap-x-6">
                        <motion.div
                            variants={fadeIn("right", 1.5)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            <Button
                                size="sm"
                                className="h-16 p-0 rounded-full text-lg text-black overflow-hidden bg-white hover:bg-white/80"
                            >
                                <a
                                    href="/file/DiscordSetup.exe"
                                    download="DiscordSetup.exe"
                                    className="flex items-center gap-x-2 w-full h-full px-8"
                                >
                                    <div>
                                        <DownloadIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        Baixar para Windows
                                    </div>
                                </a>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={fadeIn("left", 2)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            <Button
                                size="sm"
                                className="h-16 p-0 rounded-full text-lg text-white overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-purple-900 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                            >
                                {user.isSignedIn ? (
                                    <Link href="/create-server" className="flex items-center gap-x-2 w-full h-full px-8">
                                        <div>
                                            <BotIcon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            Acessar meu Discord agora
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href="/sign-in" className="flex items-center gap-x-2 w-full h-full px-8">
                                        <div>
                                            <GlobeIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            Abra o Discord no seu navegador
                                        </div>
                                    </Link>
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    variants={fadeIn("left", 2.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="hidden xl:block relative top-2"
                >
                    <ThirdHeadingBackground width="600" height="352" />
                </motion.div>
            </div>
            <motion.div
                variants={fadeIn("up", 2.5)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="hidden md:block absolute -bottom-[70px] md:-bottom-[210px] xl:-bottom-[70px] animate-bounce"
            >
                <SecondHeadingBackground width="100%" height="550" />
            </motion.div>
        </div>
    )
}
 
export default Heading