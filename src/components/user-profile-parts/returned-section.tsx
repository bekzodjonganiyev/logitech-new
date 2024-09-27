"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import noReturned from "../../../public/images/profile/no-returned.png"

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const ReturnedSection = () => {
  return (
    <div>ReturnedSection</div>
  )
}

export const NoReturnedFallback = () => {
  const { lang } = useLanguageStore()
  const { profilePage } = getDictionaryObject(lang)

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-80 h-96'>
      <Image src={noReturned.src} width={noReturned.width} height={noReturned.height} alt="No address" />
      <p className='text-lg font-semibold text-center mb-3'>{profilePage.returned.noContentTitle}</p>
      <p className='text-gray text-center leading-none mb-5'>{profilePage.returned.noContentDescription}</p>
      <Link href={"/"} className='px-4 py-2 rounded-md bg-primary text-white font-medium'>{profilePage.returned.gotoBuy}</Link>
    </div>
  )
}
