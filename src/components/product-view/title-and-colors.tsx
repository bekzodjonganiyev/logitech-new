import React, { useLayoutEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { priceFormatter } from '@/lib/price-formatter'
import { useProductColorContext } from '@/store/product-color-store'
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

import { ProductDetail } from '@/types/models/product.model'
import Link from 'next/link'
import { CartSvg, CommentSvg, EyeSvg, HeartSvg } from '../icons'
import { useFavouriteStore } from '@/store/favourite-store'
import { Rating, StickerStar } from '@smastrom/react-rating'

export type Props = {
    className?: string,
    data: ProductDetail
    currency: { name: string, rate: number }
}

export const TitleAndColors = (props: Props) => {
    const { className, data, currency } = props
    const { selectedColor, setSelectedColor } = useProductColorContext()
    const { lang } = useLanguageStore()
    const { productPage } = getDictionaryObject(lang)

    const { favourite, addToFavourite } = useFavouriteStore()
    const isInFavourite = favourite.find(item => item.id === data.id)

    const [loaded, setLoaded] = useState<boolean>(false)

    const productPirceManager = (discount?: number) => {
        const price = priceFormatter(data?.price * currency.rate, currency.name === "UZS")
        const discountedPrice = priceFormatter(data?.price * (discount ? discount / 100 : 0), currency.name === "UZS")
        const resultPrice = discount ? discountedPrice : price
        const result = currency.name === "USD" ? `$${resultPrice}` : `${resultPrice} so'm`
    
        return result
    }

    useLayoutEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <>
            {
                !loaded
                    ? <div className='flex-1 flex items-center justify-center'>Loading</div>
                    : <div className={cn('flex-1 max-md:px-2', className)}>

                        {/* PRODUCT NAME */}
                        <div className='flex justify-between'>
                            <h1 className='2xl:text-[28px] min-[1200px]:text-2xl text-[22px] font-semibold custom-1:mb-5 mb-2 line-clamp-2 leading-6'>{data?.name}</h1>
                            <button className={"w-fit h-11 p-1 rounded-xl box-border bg-white flex justify-center items-center"} onClick={() => addToFavourite(data)}>
                                <HeartSvg width="28" height="25" strokeWidth="1.3" stroke={"#914dfe"} fill={isInFavourite ? "#914dfe" : "none"} />
                            </button>
                        </div>
                        <div className='custom-1:hidden flex gap-3 mb-5'>
                            <div className='border rounded-sm p-1 flex gap-2 items-center'>
                                <Rating
                                    style={{ maxWidth: 80, gap: 1.5 }}
                                    value={data.rating ?? 5}
                                    itemStyles={{ itemShapes: StickerStar, activeFillColor: "#814EFA", inactiveFillColor: "#D3C0FF"}}
                                    readOnly
                                    orientation='horizontal'
                                />
                                <span className='min-w-fit text-sm text-darkgray'>{data.rating ?? 5}</span>
                            </div>
                            <div className='border rounded-sm p-1 flex gap-1 items-center'>
                                <CommentSvg width="28" height="25" strokeWidth="1.3" stroke={"#914dfe"} fill={isInFavourite ? "#914dfe" : "none"} />
                                <span className='min-w-fit text-sm text-darkgray'>{productPage.commentCount.replace("{{count}}", `${data.comments.length}`)}</span>
                            </div>
                            <div className='border rounded-sm p-1 flex gap-1 items-center'>
                                <EyeSvg width="28" height="25" strokeWidth="1.3" stroke={"#914dfe"} fill={isInFavourite ? "#914dfe" : "none"} />
                                <span className='min-w-fit text-sm text-darkgray'>{productPage.viewCount.replace("{{count}}", `${data.hits}`)}</span>
                            </div>
                        </div>

                        {/* COLORS */}
                        <div className='custom-1:mb-5 mb-3'>
                            <span className='custom-1:mb-2 mb-1 block font-medium'>{productPage.color}: {selectedColor.name ?? ""}</span>

                            <div className="space-x-3">
                                {
                                    data?.colors.map(item => (
                                        <button
                                            className={cn(`border border-dashed border-gray rounded-md w-8 h-8 max-md:w-10 max-md:h-10 p-[2px]`, item.id === selectedColor.id && "border-black border-solid")}
                                            key={item.id}
                                            // style={{ background: item.value }}
                                            onClick={() => setSelectedColor({ id: item.id, name: item.name, qty: item.quantity, value: item.value })}
                                        >
                                            <i className="w-full h-full rounded-md block" style={{ background: item.value }} />
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className='custom-1:mb-5 mb-3'>
                            <span className='custom-1:mb-2 block font-medium'>{productPage.price}:</span>
                            <p className='2xl:text-3xl min-[1200px]:text-2xl text-[22px] font-semibold'>{productPirceManager(data?.discount)}</p>
                            {
                                data?.discount && (
                                    <>
                                        <p className='relative text-sm text-darkgray w-fit inline mr-3'>
                                            {productPirceManager()}
                                            <span className='absolute w-full h-px bg-red-500 inset-0 top-1/2 -rotate-[9deg]'></span>
                                        </p>
                                        <span className='bg-primary rounded-header-elm p-1 text-xs text-white px-2'>{productPage.discount}</span>
                                    </>
                                )
                            }
                        </div>

                        {/* CHARACTRICKS */}
                        <div className='custom-1:mb-5 mb-3 max-md:hidden'>
                            <span className='custom-1:mb-2 block font-medium'>{productPage.info}:</span>
                            <p className='text-justify'>{data.translations[lang].description.slice(0, 200)}... 
                            <Link href="#details" className="text-primary scroll-smooth">{productPage.more}</Link></p>                            
                        </div>

                        {/* TAGS */}
                        <div className='flex flex-wrap gap-2'>
                            {
                                data.tags.map(tag => (
                                    <span key={tag.id} className='bg-lightgray px-3 py-2 text-sm rounded-lg cursor-pointer'>{tag.name}</span>
                                ))
                            }
                        </div>

                    </div>
            }
        </>
    )
}
