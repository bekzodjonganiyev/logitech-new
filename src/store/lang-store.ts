import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// import { getDictionary } from '@/lib/dictionary'

// import type { Locale } from '@/types/locale'


interface Language {
    lang: "uz" | "ru",
    setLang: (currentLang: "uz" | "ru") => void,

    // dictionary?: typeof getDictionary,
    // setDictionary?: (lang: "uz" | "ru") => void,

}

export const useLanguageStore = create(
    persist<Language>(
        (set) => ({
            lang: "ru",
            setLang: (lang) => set({ lang }),

            // dictionary: {} as typeof getDictionary,
            // setDictionary: async (lang) => {
            //     const dic = await getDictionary(lang)

            //     set({dictionary: dic})
            // }
        }),
        { name: "langStore", storage: createJSONStorage(() => localStorage) }
    )
)