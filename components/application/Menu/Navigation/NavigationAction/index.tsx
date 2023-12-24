"use client"
import TooltipAction from "@/components/application/Menu/Navigation/TooltipAction"
import { useModal } from "@/hooks/use-modal-store"
import { PlusIcon } from "lucide-react"

const NavigationAction = () => {
    const { onOpen } = useModal()

    return (
        <div>
            <TooltipAction side="right" align="center" label="Criar um servidor">
                <button onClick={() => onOpen("createServer")} className="group flex items-center">
                    <div className="flex justify-center items-center mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-600 transition-all">
                        <PlusIcon className="w-7 h-7 group-hover:text-white text-emerald-600 transition" />
                    </div>
                </button>
            </TooltipAction>
        </div>
    )
}
 
export default NavigationAction