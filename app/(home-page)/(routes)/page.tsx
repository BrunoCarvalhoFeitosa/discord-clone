"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/homepage/Navbar"
import Heading from "@/components/homepage/Heading"
import ControlledSpaceSection from "@/components/homepage/ControlledSpaceSection"
import EasyToFindSection from "@/components/homepage/EasyToFindSection"
import ForFewForManySection from "@/components/homepage/ForFewForManySection"
import ReliableTechnology from "@/components/homepage/ReliableTechnology"
import ScrollTopButton from "@/components/homepage/ScrollTopButton"

const Home = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Heading />
            <ControlledSpaceSection />
            <EasyToFindSection />
            <ForFewForManySection />
            <ReliableTechnology />
            <ScrollTopButton />
        </div>
    )
}

export default Home