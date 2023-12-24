"use client"
import { useMediaQuery } from "usehooks-ts"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/variants"
import EasyToFindImage from "@/public/svg/main/EasyToFindImage"

const EasyToFindSection = () => {
    const isMobile = useMediaQuery("(max-width: 767px)")
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1139px)")
    const isDesktop = useMediaQuery("(min-width: 1140px)")

    return (
        <section className="w-full py-20 bg-zinc-100 dark:bg-[#0C0C0C]">
            <div className="flex xs:flex-col xl:flex-row items-center xl:gap-x-8 w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
                <motion.div
                    variants={fadeIn("right", 7)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    <h2 className="xs:text-xl md:text-4xl font-bold text-center">
                        Aqui é fácil se encontrar
                    </h2>
                    <p className="mt-4 xs:text-sm md:text-lg text-center">
                        Entre no canal de voz quando estiver à toa. Amigos no mesmo servidor podem te ver e entrar imediatamente, sem nem ter que fazer a chamada. Fácil, interativo e muito rápido.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeIn("left", 7)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    {isMobile && (
                        <EasyToFindImage width="100%" height="260" />
                    )}
                    {isTablet && (
                        <EasyToFindImage width="100%" height="450" />
                        )}
                    {isDesktop && (
                        <EasyToFindImage width="600" height="400" />   
                    )}
                </motion.div>
            </div>
        </section>
    )
}
 
export default EasyToFindSection