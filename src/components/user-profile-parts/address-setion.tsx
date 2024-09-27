"use client"

import Image from 'next/image'
import React from 'react'

import noAddress from "../../../public/images/profile/no-address.png"

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const AddressSection = () => {
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    return (
        <div>AddressSection</div>
    )
}

export const NoAddressFallback = () => {
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    return (
        <div className='flex flex-col items-center justify-center mx-auto w-80 h-96'>
            <Image src={noAddress.src} width={noAddress.width} height={noAddress.height} alt="No address" />
            <p className='text-lg font-semibold text-center mb-2'>{profilePage.address.noContentTitle}</p>
            <p className='text-gray text-center leading-none'>{profilePage.address.noContentDescription}</p>
        </div>
    )
}