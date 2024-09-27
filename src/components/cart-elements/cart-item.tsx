import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import { memo } from 'react'

import '@smastrom/react-rating/style.css'

import { DeleteSvg, HeartSvg } from '../icons'

import { useCartStore } from '@/store/cart-store'
import { priceFormatter } from '@/lib/price-formatter'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

const increase = (skuId: string) => useCartStore.getState().increase(skuId)
const decrease = (skuId: string) => useCartStore.getState().decrease(skuId)
const deleteItem = (skuId: string) => useCartStore.getState().deleteFromCart(skuId)

const CartItem = ({item, qty, currency}: {item: any, qty: number, currency: {rate: number, name: string}}) => {
    const { lang } = useLanguageStore()
    const { cartsPage } = getDictionaryObject(lang)

    return (
        <li className='flex items-start lg:gap-10 gap-5 mb-5 last:mb-0'>
            {/* CHECKBOX */}
            {/* <input type='checkbox' className='w-6 h-6 peer-checked:bg-black rounded-none'/> */}

            {/* PRODUCT IMAGE */}
            <Image
                src={item.image}
                alt=""
                width={86}
                height={115}
                className='max-sm:w-[80px] max-sm:h-[120px] object-cover'
            />

            {/* NAME AND PRICE */}
            <div className='flex-grow'>
                <p className='custom-1:text-lg text-base leading-5 mb-1 line-clamp-2'>{item.name}</p>

                <div className='flex md:items-center custom-1:gap-2 max-md:flex-col'>
                    <div className='flex items-center gap-2 custom-1:border rounded-sm custom-1:p-1'>
                        <Rating
                            style={{ maxWidth: 90 }}
                            value={item.rating}
                            readOnly
                            orientation='horizontal'
                        />
                        <span className='text-darkgray'>3.0</span>
                    </div>

                    <span className='max-lg:text-sm text-gray'>
                        {cartsPage.cartItem.color}: {item.color.name}
                    </span>
                </div>

                <div className='flex custom-1:items-center max-custom-1:flex-col custom-1:gap-3'>
                    <p className='2xl:text-2xl min-[1200px]:text-xl sm:text-lg font-semibold min-w-fit'>{currency.name} {priceFormatter(item.price * currency.rate, currency.name === "UZS")}</p>
                    {/* <p className='relative sm:text-sm text-xs text-darkgray w-fit inline mr-3 min-w-fit'>
                        1 869 000 so’m
                        <span className='absolute w-full h-px bg-red-500 inset-0 top-1/2 -rotate-[9deg]'></span>
                    </p> */}
                </div>

            </div>

            {/* COUNTER */}
            <div>
                <div className='flex items-center justify-between lg:gap-5 gap-3 border px-2 py-1 rounded-md mb-2'>
                    <button className='text-lg' onClick={() => decrease(item.skuId)} >–</button>
                    <span>{qty}</span>
                    <button className='text-xl'  onClick={() => increase(item.skuId)}>+</button>
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <button className='text-red-600 lg:text-sm text-xs'><span className='max-custom-1:hidden'>{cartsPage.cartItem.addToFavourite}</span><HeartSvg className='custom-1:hidden'/></button>
                    <span className='h-4 border-l border-gray'></span>
                    <button className='text-red-600 lg:text-sm text-xs' onClick={() => deleteItem(item.skuId)}><span className='max-custom-1:hidden'>{cartsPage.cartItem.deleteFromCart}</span><DeleteSvg className='custom-1:hidden'/></button>
                </div>
            </div>
        </li>
    )
}

export default memo(CartItem)