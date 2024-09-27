'use client'

import React from 'react'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

const Page = () => {
  const { lang } = useLanguageStore()
  const { comparePage } = getDictionaryObject(lang)

  return (
    <div className='container'>
      <div className='flex items-center justify-center h-96'>{comparePage.noContentDescription}</div>
    </div>
  )
}

export default Page