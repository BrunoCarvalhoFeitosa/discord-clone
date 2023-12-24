"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/variants"
import { Button } from "@/components/ui/button"
import { BotIcon, GlobeIcon } from "lucide-react"
import ReliableTechnologyImage from "@/public/svg/main/ReliableTechnologyImage.svg"
import SparklesImage from "@/public/svg/main/SparklesImage"
import { useUser } from "@clerk/nextjs"

const ReliableTechnology = () => {
    const user = useUser()
    return (
        <section className="w-full pt-20 pb-32 md:pb-44 bg-zinc-100 dark:bg-[#222]">
            <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
                <div>
                    <motion.h3
                        variants={fadeIn("down", 11)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="xs:text-xl md:text-4xl font-bold text-center"
                    >
                        Tecnologia de conexão confiável
                    </motion.h3>
                    <motion.p
                        variants={fadeIn("up", 11)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="xl:w-[60%] mx-auto mt-6 xs:text-sm md:text-lg text-center"
                    >
                        Voz e vídeo de baixa latência, para você conversar como se estivesse na mesma sala. Dê um joinha por vídeo, veja amigos transmitirem a jogatina do dia ou junte uma galera pra desenhar na tela compartilhada.
                    </motion.p>
                </div>
                <motion.div
                    variants={fadeIn("up", 11.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="flex justify-center"
                >
                    <Image
                        src={ReliableTechnologyImage}
                        width="1000"
                        height="450"
                        alt="Tecnologia de conexão confiável"
                        title="Voz e vídeo de baixa latência, para você conversar como se estivesse na mesma sala. Dê um joinha por vídeo, veja amigos transmitirem a jogatina do dia ou junte uma galera pra desenhar na tela compartilhada."
                    />
                </motion.div>
                <div className="pt-14">
                    <div className="relative">
                        <motion.div
                            variants={fadeIn("down", 13.5)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            <h3 className="text-xl md:text-4xl font-bold text-center">
                                Vamos começar sua jornada?
                            </h3>
                        </motion.div>
                        <div className="absolute -top-12 left-[50%] translate-x-[-50%]">
                            <motion.div
                                variants={fadeIn("up", 13.5)}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                            >
                                <SparklesImage width="100%" height="50" />
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        variants={fadeIn("up", 13.5)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="pt-8 flex justify-center"
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
        </section>
    )
}
 
export default ReliableTechnology