"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface TooltipActionProps {
    label: string
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
}

const TooltipAction = ({ label, children, side, align } : TooltipActionProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="text-sm font-semibold">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
 
export default TooltipAction