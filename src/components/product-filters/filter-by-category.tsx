"use client"

import Link from "next/link"

import { CategoryData } from "@/types/models/category-data.mode"

type FilterByCategoryType = {
  title: string,
  categories: CategoryData["partner"] | undefined,
  lang: "uz" | "ru"
}

export const FilterByCategory = (props: FilterByCategoryType) => {
  const { categories, title, lang } = props
  return (
    <div>
      <h2 className="text-darkgray text-left text-2xl font-bold mb-5">{title}</h2>

      <ul className="text-left">
        {
          categories?.map(item => (
            <li key={item.id} className="mb-3 last:mb-0"><Link href={item.slug}>{item.translations[lang].name}</Link></li>
          ))
        }
      </ul>
    </div>
  )
}