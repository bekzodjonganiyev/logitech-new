"use client"

import Link from "next/link"

import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

export const SubHeader = () => {
    const { lang } = useLanguageStore()
    const { header } = getDictionaryObject(lang)

    return (
        <nav className='container py-5 flex justify-between max-custom-1:hidden'>
            {
                header.subHeader.map((link) => <Link className="hover:text-primary text-sm text-darkgray" href={link.href} key={link.key} dangerouslySetInnerHTML={{ __html: link.name }}></Link>)
            }
        </nav>
    )

}
