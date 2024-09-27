"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from '@radix-ui/react-icons'

import { PCAddressSvg, PCLogoutScg, PCOrdersSvg, PCReturnetSvg, PCUserSvg } from '../icons'

import { cn } from '@/lib/utils'
import { logout } from '@/lib/actions'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const UserProfileSidebar = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    const isCurrnetPath = (path: string): boolean => {
        return pathname === path
    }

    return (
        <ul className={cn('custom-1:border-r custom-1:pr-8 pt-8  custom-1:w-64 w-full', "", className)}>
            <li className={cn('group rounded-xl text-lg mb-2 last:mb-0 hover:bg-[#EDE5FF]', (isCurrnetPath("/profile") || isCurrnetPath("/profile/personal-info")) && "bg-[#EDE5FF]")}>
                <Link href={"/profile/personal-info"} className={cn('flex items-center gap-3 p-3 font-medium', (isCurrnetPath("/profile") || isCurrnetPath("/profile/personal-info")) && "text-primary")}><PCUserSvg stroke={(isCurrnetPath("/profile") || isCurrnetPath("/profile/personal-info")) ? "#914dfe" : "#697172"} />{profilePage.personalInfo.title}<ChevronRightIcon className='ml-auto custom-1:hidden' /></Link>
            </li>
            <li className={cn('group rounded-xl text-lg mb-2 last:mb-0 hover:bg-[#EDE5FF]', isCurrnetPath("/profile/address") && "bg-[#EDE5FF]")}>
                <Link href={"/profile/address"} className={cn('flex items-center gap-3 p-3 font-medium', isCurrnetPath("/profile/address") && "text-primary")}><PCAddressSvg stroke={isCurrnetPath("/profile/address") ? "#914dfe" : "#697172"} />{profilePage.address.title}<ChevronRightIcon className='ml-auto custom-1:hidden' /></Link>
            </li>
            <li className={cn('group rounded-xl text-lg mb-2 last:mb-0 hover:bg-[#EDE5FF]', isCurrnetPath("/profile/orders") && "bg-[#EDE5FF]")}>
                <Link href={"/profile/orders"} className={cn('flex items-center gap-3 p-3 font-medium', isCurrnetPath("/profile/orders") && "text-primary")}><PCOrdersSvg stroke={isCurrnetPath("/profile/orders") ? "#914dfe" : "#697172"} />{profilePage.order.title}<ChevronRightIcon className='ml-auto custom-1:hidden' /></Link>
            </li>
            <li className={cn('group rounded-xl text-lg mb-2 last:mb-0 hover:bg-[#EDE5FF]', isCurrnetPath("/profile/returned") && "bg-[#EDE5FF]")}>
                <Link href={"/profile/returned"} className={cn('flex items-center gap-3 p-3 font-medium', isCurrnetPath("/profile/returned") && "text-primary")}><PCReturnetSvg stroke={isCurrnetPath("/profile/returned") ? "#914dfe" : "#697172"} />{profilePage.returned.title}<ChevronRightIcon className='ml-auto custom-1:hidden' /></Link>
            </li>
            <li className={cn('group p-3 rounded-xl text-lg mb-2 last:mb-0')} onClick={() => {
                logout()
            }}>
                <button><span className='flex items-center gap-3'><PCLogoutScg />{profilePage.logout}</span></button>
            </li>
        </ul>
    )
}
