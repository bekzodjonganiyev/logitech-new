import { ReactNode } from 'react'
import Link from 'next/link'

import "@/styles/globals.css"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { LogitechSvg, RuFlag, UzFlag } from '@/components/icons'
import { LanguageChanger } from '@/components/header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="bg-white z-10 border-b-2 border-gray py-5 sticky top-0 ">
        <div className='container flex items-center justify-between gap-10'>
          {/* Lang changer */}
          <LanguageChanger />

          {/* Main logo */}
          <Link href="/" className="w-[102px]">
            <span className="h-8"><LogitechSvg /></span>
          </Link>

          {/* Contact us */}
          <button className='font-semibold underline'>
            Qo&apos;llab quvvatlash
          </button>
        </div>

      </header>
      <main className="flex-1 py-5 bg-lightgray">{children}</main>
    </>
  )
}

export default Layout

// const LanguageChanger = () => {
//   const { lang, setLang } = useLanguageStore()

//   return (
//     <>
//       {/* DESKTOP LANG CHANGER */}
//       <Select defaultValue={lang} value={lang} onValueChange={(e: "uz" | "ru") => {
//         setLang(e)
//       }}>
//         <SelectTrigger className="w-[100px] border-none focus:ring-0 shadow-none p-0 max-custom-1:hidden">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ru">
//             <span className="flex gap-2 items-center"><RuFlag />Ruscha</span>
//           </SelectItem>
//           <SelectItem value="uz">
//             <span className="flex gap-2 items-center"><UzFlag />O&apos;zbekcha</span>
//           </SelectItem>
//         </SelectContent>
//       </Select>

//       {/* MOBILE LANG CHANGER */}
//       <Select defaultValue={lang} value={lang} onValueChange={(e: "uz" | "ru") => setLang(e)}>
//         <SelectTrigger className="w-[70px] border-none focus:ring-0 shadow-none px-2 bg-lightgray custom-1:hidden">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ru">
//             <span className="flex gap-2 items-center"><RuFlag />RUS</span>
//           </SelectItem>
//           <SelectItem value="uz">
//             <span className="flex gap-2 items-center"><UzFlag />UZB</span>
//           </SelectItem>
//         </SelectContent>
//       </Select>
//     </>
//   )
// }