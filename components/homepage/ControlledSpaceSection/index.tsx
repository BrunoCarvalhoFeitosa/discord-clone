"use client"
import { useMediaQuery } from "usehooks-ts"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/variants"
import ControlledSpaceImage from "@/public/svg/main/ControlledSpaceImage"

const ControlledSpaceSection = () => {
    const isMobile = useMediaQuery("(max-width: 767px)")
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1139px)")
    const isDesktop = useMediaQuery("(min-width: 1140px)")

    return (
        <section className="w-full py-20 bg-white dark:bg-[#000]">
            <div className="flex xs:flex-col xl:flex-row items-center xl:gap-x-8 w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
                <motion.div
                    variants={fadeIn("right", 5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="mt-3 md:mt-0 order-2 xl:order-none"
                >
                    {isMobile && (
                        <ControlledSpaceImage width="100%" height="260" />
                    )}
                    {isTablet && (
                        <ControlledSpaceImage width="100%" height="450" />
                        )}
                    {isDesktop && (
                        <ControlledSpaceImage width="600" height="400" />   
                    )}
                </motion.div>
                <motion.div
                    variants={fadeIn("left", 5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="order-1 xl:order-none"
                >
                    <h2 className="xs:text-xl md:text-4xl font-bold text-center">
                        Crie um espaço controlado
                    </h2>
                    <p className="mt-4 xs:text-sm md:text-lg text-center">
                        Os servidores Discord são organizados em canais com assuntos para vocês colaborarem, compartilharem ou simplesmente falarem do dia sem entupir um chat geral.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
 
export default ControlledSpaceSection