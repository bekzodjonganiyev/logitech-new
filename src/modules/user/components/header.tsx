"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

export const Header = ({ className, children }: { className?: string, children: ReactNode, }) => {
    return <div className={cn("flex items-center justify-between", className)}>{children}</div>
}

export const HeaderTitle = ({ title }: { title: string }) => {
    const { push } = useRouter()

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => push("/profile")} className="custom-1:hidden"><ArrowLeftIcon width={28} height={28} color="#914dfe"/></button>
            <h1 className='custom-1:text-3xl font-semibold'>{title}</h1>
        </div>
    )
}

export const HeaderAction = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <button className={cn('custom-1:px-4 px-2 custom-1:py-2 py-1 rounded-lg bg-primary', className)}>
            <span className={cn('flex items-center custom-1:gap-2 gap-1')}>
                {children}
            </span>
        </button>
    )
}