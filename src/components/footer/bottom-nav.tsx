import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { BagSvg, CatalogSvg, GoHomeSvg, HeartSvg, PCUserSvg } from '../icons'
import { LoginModal } from '../responsive-modal/login-modal'

import { useCartStore } from '@/store/cart-store'
import { decodeToken } from '@/lib/checkAuth'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const BottomNav = () => {
    const user = decodeToken()

    const { lang } = useLanguageStore()
    const { header } = getDictionaryObject(lang)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <nav className='container fixed bottom-0 w-full bg-white py-2 flex items-center justify-between gap-5 shadow custom-1:hidden'>
            <Link href={"/"} className='flex flex-col items-center'>
                <GoHomeSvg />
                <p className='max-sm:text-sm'>{header.mainHeader.goToMain}</p>
            </Link>

            <Link href={"/products/category"} className='flex flex-col items-center'>
                <CatalogSvg />
                <p className='max-sm:text-sm'>{header.mainHeader.catalog}</p>
            </Link>

            <Link href={"/favourite"} className='flex flex-col items-center'>
                <HeartSvg />
                <p className='max-sm:text-sm'>{header.mainHeader.liked}</p>
            </Link>

            <CartsButton title={header.mainHeader.cart} />

            {
                loaded
                    ? <>
                        {
                            user && (user.exp as number) * 1000 > Date.now()
                                ? <GoToProfileButton title={header.mainHeader.goToProfile}/>
                                : <LoginModal />
                        }
                    </>
                    : <span className="block w-12 h-10 bg-gray rounded-full animate-pulse"></span>
            }
        </nav>
    )
}

const GoToProfileButton = ({ title }: { title: string }) => {
    const { push } = useRouter()

    return (
        <button onClick={() => push("/profile")} className="flex flex-col items-center gap-0 hover:text-primary text-[14px]">
            <PCUserSvg width="30" height="25" stroke="black" /> <span>{title}</span>
        </button>
    )
}


const CartsButton = ({ title }: { title: string }) => {
    const carts = useCartStore((state) => state.carts)

    return (
        <Link href={"/cart"} className='flex flex-col items-center relative'>
            <BagSvg />
            <p className='max-sm:text-sm'>{title}</p>
            {
                carts.length > 0 && <span className="absolute right-2 -top-3 flex items-center justify-center bg-red-500 text-white text-xs font-medium w-5 h-5 rounded-full">{carts.length}</span>
            }
        </Link>

    )
}
