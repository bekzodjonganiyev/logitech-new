"use client"

import { ProductsGrid } from '@/components/products-grid'
import { useFavouriteStore } from '@/store/favourite-store'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

const Page = () => {
  const { favourite } = useFavouriteStore()
  const { lang } = useLanguageStore()
  const { favouritePage } = getDictionaryObject(lang)

  return (
    <>
      {
        favourite.length > 0
          ? <ProductsGrid className='container grid lg:grid-cols-4 min-[720px]:grid-cols-3 grid-cols-2 lg:gap-7 gap-5' gridType='galary' items={favourite} />
          : <div className='flex items-center justify-center h-96'>{favouritePage.noContentDescription}</div>
      }
    </>
  )
}

export default Page