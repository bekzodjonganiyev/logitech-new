import type { Locale } from '@/types/locale'

import { translation as UZ } from "@/dictionaries/uz"
import { translation as RU } from "@/dictionaries/ru"

const dictionaries = {
  ru: () => import('@/dictionaries/uz.json').then(module => module.default),
  uz: () => import('@/dictionaries/ru.json').then(module => module.default)
}

const dictionariesObject = {
  uz: UZ,
  ru: RU
}

export const getDictionaryObject = (lang: "uz" | "ru") => dictionariesObject[lang]
export const getDictionary = async (locale: Locale) => dictionaries[locale]()