"use client"
import { useScrollTop } from "@/hooks/use-scroll-top"
import { MoveUpIcon } from "lucide-react"

const ScrollTopButton = () => {
    const scrolled = useScrollTop()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <div className="fixed bottom-8 right-8 z-[99999]">
            <button
                className={`${scrolled ? "block" : "hidden"} p-4 rounded-full bg-black dark:bg-white cursor-pointer`}
                onClick={scrollToTop}
            >
                <MoveUpIcon className="w-6 h-6 text-white dark:text-black" />
            </button>
        </div>
    )
}

export default ScrollTopButton