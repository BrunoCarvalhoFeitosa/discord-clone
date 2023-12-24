"use client"
import { useMediaQuery } from "usehooks-ts"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/variants"
import ForFewForManyImage from "@/public/svg/main/ForFewForManyImage"

const ForFewForManySection = () => {
    const isMobile = useMediaQuery("(max-width: 767px)")
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1139px)")
    const isDesktop = useMediaQuery("(min-width: 1140px)")

    return (
        <section className="w-full py-20 bg-white dark:bg-[#111]">
            <div className="flex xs:flex-col xl:flex-row items-center xl:gap-x-8 w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
                <motion.div
                    variants={fadeIn("right", 9)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="mt-3 md:mt-0 order-2 xl:order-none"
                >
                    {isMobile && (
                        <ForFewForManyImage width="100%" height="260" />
                    )}
                    {isTablet && (
                        <ForFewForManyImage width="100%" height="450" />
                        )}
                    {isDesktop && (
                        <ForFewForManyImage width="600" height="400" />   
                    )}
                </motion.div>
                <motion.div
                    variants={fadeIn("right", 9)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="order-1 xl:order-none"
                >
                    <h2 className="xs:text-xl md:text-4xl font-bold text-center">
                        Para poucos e para muitos
                    </h2>
                    <p className="mt-4 xs:text-sm md:text-lg text-center">
                        Organize qualquer comunidade com ferramentas de moderação e acesso personalizado a membros. Dê poderes especiais aos membros, monte canais privados e muito mais.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
 
export default ForFewForManySection