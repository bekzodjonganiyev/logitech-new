import { useState, useLayoutEffect, useEffect } from "react"
import Link from "next/link"
import { Rating, StickerStar } from "@smastrom/react-rating"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import '@smastrom/react-rating/style.css'

import { CartSvg, CompareSvg, GuarantyIconSvg, HeartSvg, LogitechSvg, StoreSvg } from "../icons"
import { ParametrsAndActionsSkelton } from "./parametrs-and-actions-skeleton"


import { cn } from "@/lib/utils"
import { useProductColorContext } from "@/store/product-color-store"
import { useFavouriteStore } from "@/store/favourite-store"
import { useCompareStore } from "@/store/compare-store"
import { Cart, useCartStore } from "@/store/cart-store"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"


import { ProductDetail } from "@/types/models/product.model"
import { priceFormatter } from "@/lib/price-formatter"

export type ParametrsAndActionsType = {
    className: string,
    addToFavourite?: Function,
    addToCompare?: Function,
    addToCart?: Function,
    buyOneClick?: Function,
    data: ProductDetail, 
    currency: { name: string, rate: number }
}

export const ParametrsAndActions = (props: ParametrsAndActionsType) => {
    const { className, data, currency } = props

    const [showBottomPricePanel, setShowBottomPricePanel] = useState<boolean>(true)
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {    
        if (window.scrollY > lastScrollY) {
            if (Math.abs(window.scrollY - lastScrollY) > 5)
                setShowBottomPricePanel(false)
        } else {
            if (Math.abs(window.scrollY - lastScrollY) > 10)
                setShowBottomPricePanel(true)
        }
        
        setLastScrollY(window.scrollY);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const { push } = useRouter()
    const { selectedColor } = useProductColorContext()
    const { carts, addToCart: _addToCart, increase, decrease } = useCartStore()
    const { favourite, addToFavourite } = useFavouriteStore()
    const { compare, addToCompare } = useCompareStore()
    const { lang } = useLanguageStore()
    const { productPage } = getDictionaryObject(lang)

    const skuId = `${data?.id}-${selectedColor.id}`
    const photoSrc = data?.photos.find(photo => photo.color === selectedColor.name)?.source
    const isInFavourite = favourite.find(item => item.id === data.id)
    const isInCompare = compare.find(item => item.id === data.id)
    const shouldAddItem: Cart = {
        id: data.id,
        color: selectedColor,
        image: photoSrc as string,
        name: data.name,
        price: data.price,
        qty: 1,
        rating: data.rating,
        skuId: skuId
    }

    const [loaded, setLoaded] = useState<boolean>(false)
    const [storedProduct, setStoredProduct] = useState<Cart | undefined>()

    const addToCart = () => {
        if (storedProduct) {
            push("/cart", { scroll: true })
        } else {
            if (selectedColor.id > 0) {
                _addToCart(shouldAddItem)
            } else {
                toast.error(
                    "Tovarning rangini tanlang",
                    {
                        position: "top-center", richColors: true, dismissible: true, duration: 2000,
                    }
                )
            }
        }
    }

    const productPirceManager = () => {
        const price = priceFormatter(data?.price * currency.rate, currency.name === "UZS")
        const result = currency.name === "USD" ? `$${price}` : `${price} so'm`
    
        return result
    }

    useLayoutEffect(() => {
        setLoaded(true)
    }, [])

    useEffect(() => {
        const checkStoredProduct = () => {
            const findedProduct = carts.find(product => product.skuId === skuId)

            if (findedProduct) setStoredProduct(findedProduct)
            else setStoredProduct(undefined)
        }

        checkStoredProduct()
    }, [skuId, carts])


    return (
        <>
            {
                !loaded
                    ? <ParametrsAndActionsSkelton />
                    : <>
                    <div className={cn("flex flex-col justify-around w-[250px]", className)}>

                        <div className="flex flex-col justify-end gap-y-3 bg-lightgray p-[19px] rounded-category-product-card mb-[28px]">
                            <div className='flex items-center gap-2 mb-4'>
                                <Rating
                                    style={{ maxWidth: 90 }}
                                    value={5}
                                    itemStyles={{ itemShapes: StickerStar, activeFillColor: "#814EFA", inactiveFillColor: "#D3C0FF"}}
                                    readOnly
                                    orientation='horizontal'
                                />
                                <span className='min-w-fit text-xs text-darkgray'>{data.rating ?? 5} <Link href="#comments" className='underline'>({productPage.ratingCount.replace("{{count}}", `${100}`)})</Link></span>
                            </div>

                            <div className="flex items-center gap-2 justify-between box-border">
                                <button className={cn("w-1/2 h-11 p-1 rounded-xl box-border bg-white flex justify-center items-center", isInFavourite && "bg-primary text-white")} onClick={() => addToFavourite(data)}>
                                    <HeartSvg width="28" height="25" strokeWidth="1.3" stroke={isInFavourite ? "#914dfe" : "black"} fill={isInFavourite ? "white" : "none"} />
                                </button>
                                <button className="w-1/2 h-11 p-1 rounded-xl box-border bg-white flex justify-center items-center" onClick={() => addToCompare(data)}>
                                    <CompareSvg width="24" height="21" stroke={"black"} fill={"black"} className="fill-black" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                {
                                    storedProduct
                                        ? (
                                            <div className='flex items-center justify-between lg:gap-5 gap-3 border px-2 py-1 rounded-md'>
                                                <button className='text-lg' onClick={() => decrease(skuId)} >–</button>
                                                <span className="font-bold w-6 text-center">{storedProduct.qty}</span>
                                                <button className='text-xl' onClick={() => increase(skuId)}>+</button>
                                            </div>
                                        ) : null
                                }

                                <p className="min-w-fit text-xs text-stockcolor py-2">{productPage.inStockCount.replace("{{count}}", `${selectedColor.qty}`)}</p>
                            </div>

                            <button className="bg-primary p-[10px] text-white font-semibold rounded-xl" onClick={() => addToCart()}>
                                <span className="flex items-center justify-center gap-2">
                                    {
                                        storedProduct
                                            ? <span>{productPage.goToCart}</span>
                                            : <> <CartSvg width="22" height="24" strokeWidth="2" stroke="white" className="stroke-white" /><span>{productPage.addToCart}</span></>
                                    }
                                </span>
                            </button>

                            <button className="text-primary border border-primary rounded-xl p-[10px] text-base font-semibold mb-5">{productPage.buyOneClick}</button>

                            <button className="bg-lightgray text-darkgray rounded-xl p-[10px] text-base bg-white">
                                <span className="flex items-center justify-center"><StoreSvg />{productPage.otherMarketsPrice}</span>
                            </button>
                        </div>

                        <div className="relative bg-lightgray rounded-category-product-card overflow-hidden h-24 flex items-center justify-end">
                            <GuarantyIconSvg className="absolute top-3 -left-7" />

                            <div className="w-2/3">
                                <LogitechSvg width="78" height="24"/>
                                <p className="leading-4 text-xs" >
                                    {productPage.garantyBagde}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className={cn('container fixed left-0 bottom-0 w-full py-3 border-t-gray border-t bg-white z-10 custom-1:hidden translate-y-20 flex justify-between items-center transition-transform', showBottomPricePanel && "translate-y-0")}>
                        <h1 className='2xl:text-[28px] min-[1200px]:text-2xl text-[22px] font-semibold custom-1:mb-5 line-clamp-2 leading-6 max-sm:text-xl mr-1'>{productPirceManager()}</h1>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                    {
                                        storedProduct
                                        ? (
                                            <div className='flex items-center justify-between lg:gap-5 gap-3 max-sm:gap-1 border px-2 py-1 rounded-md'>
                                                    <button className='text-lg' onClick={() => decrease(skuId)} >–</button>
                                                    <span className="font-bold w-6 text-center">{storedProduct.qty}</span>
                                                    <button className='text-xl' onClick={() => increase(skuId)}>+</button>
                                                </div>
                                            ) : null
                                        }
                                </div>
                            <button className="bg-primary p-[10px] text-white font-semibold rounded-xl" onClick={() => addToCart()}>
                                <span className="flex items-center justify-center gap-2">
                                    {
                                        storedProduct
                                        ? <span className="max-sm:text-xs py-1">{productPage.goToCart}</span>
                                        : <> <CartSvg width="22" height="24" strokeWidth="2" stroke="white" className="stroke-white" /><span>{productPage.addToCart}</span></>
                                    }
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
