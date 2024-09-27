"use client"

import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

import noOrders from "../../../../public/images/profile/no-orders.png"

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

import { Order } from '@/types/models/order.model'

export const OrdersList = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("flex flex-col", className)}>
            {children}
        </div>
    )
}

export const OrdersItem = ({ ordersItem }: { ordersItem: Order }) => {
    return (
        <div>
            <details>
                <summary>Buyurtma ID {ordersItem.id}</summary>
                <pre>{JSON.stringify(ordersItem, null, 2)}</pre>
            </details>
        </div>
    )
}

export const OrdersSectionTabs = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    const isSelectedTab = (currentTab: string): boolean => {
        const activeTab = searchParams.get("type") ?? "all"

        const possibleTabs = ["P", "all", "A", "X"]

        return currentTab === (possibleTabs.includes(activeTab) ? activeTab : "all")
    }

    const Button = ({ filterType, href, title }: { filterType: string, href: string, title: string }) => {
        return (
            <button className={cn("px-4 py-3 rounded-md w-1/4 bg-lightgray text-darkgray font-medium text-sm", isSelectedTab(filterType) && "bg-white border-2 border-primary text-primary")} onClick={() => push(href)}>{title}</button>
        )
    }

    return (
        <div className="flex justify-between items-center gap-5">
            <Button filterType="all" href="/profile/orders?type=all" title={profilePage.order.status.all} />
            <Button filterType="P" href="/profile/orders?type=P" title={profilePage.order.status.pending} />
            <Button filterType="A" href="/profile/orders?type=A" title={profilePage.order.status.complated} />
            <Button filterType="X" href="/profile/orders?type=X" title={profilePage.order.status.cancelled} />
        </div>
    )
}

export const OrdersSectionFallback = () => {
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    return (
        <div className='flex flex-col items-center justify-center mx-auto w-80 h-96'>
            <Image src={noOrders.src} width={noOrders.width} height={noOrders.height} alt="No address" />
            <p className='text-lg font-semibold text-center mb-3'>{profilePage.order.noContentTitle}</p>
            <p className='text-gray text-center leading-none mb-5'>{profilePage.order.noContentDescription}</p>
            <Link href={"/"} className='px-4 py-2 rounded-md bg-primary text-white font-medium'>{profilePage.order.gotoBuy}</Link>
        </div>
    )
}