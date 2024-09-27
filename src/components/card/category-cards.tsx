"use client"

import Link from "next/link"
import Image from "next/image"

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

import { CategoryCardsType } from "@/types"
import { cn } from "@/lib/utils"

export const CategoryCards = (props: CategoryCardsType) => {
  const { href, name, img, className, imgClassName, wh } = props
  const { lang } = useLanguageStore()
  const { categoryCards } = getDictionaryObject(lang)

  return (
    <div className={cn("flex flex-col items-center rounded-category-product-card overflow-hidden", className)}>
      <Link href={href}>
        <Image
          src={img}
          alt={name}
          placeholder="empty"
          width={wh.w}
          height={wh.h}
          className={cn(imgClassName)}
        />
      </Link>
      
      <Link href={href} className="custom-1:text-[26px] md:text-xl text-base font-bold text-center mx-auto">
        {categoryCards[name as keyof typeof categoryCards]}
      </Link>
    </div>
  )
}