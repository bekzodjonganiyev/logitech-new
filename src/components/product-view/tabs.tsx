import { getDictionaryObject } from '@/lib/dictionary'
import { useLanguageStore } from '@/store/lang-store'
import { ProductDetail } from '@/types/models/product.model'
import React from 'react'

export const DetailInfoTab = ({ data, desc }: { data: ProductDetail["fields"] | undefined, desc:string | any,  }) => {
  const { lang } = useLanguageStore()
  const { productPage } = getDictionaryObject(lang)

  return (
    <div id='details' className='py-5'>
      <div className='pb-4 text-lg text-justify max-md:text-base'>
        <h2 className='text-2xl max-md:text-xl font-semibold py-1'>{productPage.info}</h2>
        {desc}
      </div>
      <div>
        <h2 className='text-2xl max-md:text-xl font-semibold py-3'>{productPage.spesifications}</h2>
        {
          data?.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-1 mb-3 last:mb-0">
              <p className="text-lg leading-3 max-md:text-base">{item?.translations?.[lang].label}</p>
              <span className="flex-1 border-b border-dashed border-darkgray"></span>
              <p className="text-lg leading-[0px] max-md:text-base"> {item?.translations?.[lang].value}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export const CommentsTab = () => {
  return (
    <div id='comments' className='text-center'>No comments</div>
  )
}