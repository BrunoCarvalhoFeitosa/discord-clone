import { useState, useEffect } from "react"

export const useScrollTop = (threshold = 1000) => {
    const [scrolled, setScrolled] = useState<boolean>(false)

    const handleScroll = () => {
        if (window.scrollY > threshold) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return scrolled
}