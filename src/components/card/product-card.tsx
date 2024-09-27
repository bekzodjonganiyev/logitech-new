"use client"

import { useState, useLayoutEffect, memo } from "react"
import { Rating, StickerStar } from "@smastrom/react-rating"
import Image from "next/image"
import Link from "next/link"

import '@smastrom/react-rating/style.css'

import { CartSvg, CompareSvg, HeartSvg, OneClickSvg } from "@/components/icons"

import { priceFormatter } from "@/lib/price-formatter"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { useFavouriteStore } from "@/store/favourite-store"
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

import { Product } from "@/types/models/product.model"

const add = (a: any) => useCartStore.getState().addToCart(a)
const addToFavourite = (a: Product) => useFavouriteStore.getState().addToFavourite(a)

type ProductCardType = {
  variant?: "galary" | "galary2" | "list",
  href: string,
  item: Product,
  // isCart: boolean,
  currency: { name: string, rate: number },
  isFavorite: boolean,
  isCompare: boolean,
  inCartQty: number | undefined
  openModal: React.Dispatch<React.SetStateAction<{ state: boolean, product: any }>>,
}


const addToCart = (item: Product, openModal: React.Dispatch<React.SetStateAction<{ state: boolean, product: any }>>) => {
  if (item.colors.length > 1) {
    openModal({ state: true, product: item })
  } else {
    const shouldAddItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item?.photos[0].source,
      color: item.colors[0],
      qty: 1,
      skuId: `${item.id}-${item.colors[0].id}`,
      rating: item.rating
    }
    add(shouldAddItem)
  }
}

const ProductCard = (props: ProductCardType) => {
  const { variant, href, item, /*isCart, */ currency, isFavorite, openModal } = props

  // Product card variants
  const galary = variant === "galary"
  const galary2 = variant === "galary2"
  const list = variant === "list"

  const { lang } = useLanguageStore()
  const { productCard } = getDictionaryObject(lang)

  const [photoSrc, setPhotoSrc] = useState({ selectedPhotoId: 0, url: item.photos[0].source })
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    setLoaded(true)

    const photoSrc = item.photos.find(photo => photo.status === "M")
    setPhotoSrc({ selectedPhotoId: 0, url: photoSrc?.source as string })
  }, [])

  const productPirceManager = () => {
    const price = priceFormatter(item.price * currency.rate, currency.name === "UZS")
    const result = currency.name === "USD" ? `$${price}` : `${price} so'm`

    return result
  }

  return (
    <div className={cn("group border-gray border-[1.3px] rounded-xl p-[15px] max-sm:p-[10px]", galary2 && "p-[20px] max-sm:p-[15px]")}>
      <div className={cn("relative w-full h-full", (galary2 || list) && "flex gap-5")}>
        {/* IMAGE */}
        <Link href={href} className={cn(galary2 && "w-1/2", list && "w-[200px] md:min-w-1/4")}>
          <div className={cn("rounded-card overflow-hidden", galary && "mb-4", galary2 && "w-full h-full")}>
            <Image
              className={cn("object-cover transition w-full ease-in-out group-hover:scale-110", galary2  && "h-full sm:max-md:h-72")}
              alt="Product image"
              src={photoSrc.url}
              width={225}
              height={300}
              priority
              />
          </div>
        </Link>

        {/* POSITION ABSOLUTE LIKE BUTTON */}
        <button
          className={cn("absolute shadow-md max-sm:w-8 w-10 max-sm:h-8 h-10 p-2 max-sm:p-1.5 rounded-full top-2 right-2 bg-white",
            galary2 && "top-0 right-0 bg-lightgray",
            list && "hidden"
          )}
          onClick={() => addToFavourite(item)}
        >
          <span className="w-full h-full flex justify-center items-center">
            <HeartSvg stroke={"#FF2947"} fill={isFavorite ? "#FF2947" : "white"} />
          </span>
        </button>

        {/* DETAILED INFO */}
        <div className={cn("hidden flex-1", list && "flex flex-col justify-evenly gap-0")}>

          <Link href={href}> <p className="mb-[7px] font-semibold sm:text-xl text-base hover:text-primary sm:leading-5 leading-4 line-clamp-1">{item.name}</p></Link>

          <Rating
            style={{ maxWidth: 90, display: list ? "flex" : "none" }}
            itemStyles={{ itemShapes: StickerStar, activeFillColor: "#814EFA", inactiveFillColor: "#D3C0FF"}}
            value={item.rating}
            readOnly
            orientation='horizontal'
          />

          <ul className="flex flex-col gap-1">
            {
              item.fields?.slice(0, 5).map(field => {
                return (
                  <li key={field.id} className="flex items-center justify-between gap-1" title={`${field.translations[lang].label} ${field.translations[lang].value}`} >
                    <span className="w-1/4 line-clamp-1">{field.translations[lang].label}</span>
                    <span className="border border-dashed flex-1"></span>
                    <span className="w-1/3 line-clamp-1">{field.translations[lang].value}</span>
                  </li>
                )
              })
            }
          </ul>

          <ul className="flex flex-wrap gap-2">
            {
              item.colors.map(color => (
                <li key={color.id} className={cn("w-8 h-8 rounded-full p-1 border border-dashed border-gray cursor-pointer", photoSrc.selectedPhotoId === color.id && "border-black border-solid")}
                  onClick={() => {
                    const photoSrc = item.photos.find(photo => (photo.color === color.name && photo.status === "M"))                    
                    setPhotoSrc({ selectedPhotoId: color.id, url: photoSrc?.source as string })
                  }}>
                  <i className="w-full h-full rounded-full block" style={{ background: color.value }}></i>
                </li>
              ))
            }
          </ul>

        </div>

        {/* NAME, RATE, COLORS, PRICE, CART BUTTON */}
        <div className={cn(galary2 && "w-1/2 pt-4 flex flex-col justify-between", list && "max-w-80 md:w-fit w-56 flex flex-col gap-5")}>
          <div className={cn("px-3 flex flex-col h-full", list && "px-0")}>
            {/* NAME */}
            <Link href={href}> <p className={cn("mb-[7px] sm:text-lg text-base hover:text-primary sm:leading-5 leading-4 line-clamp-1", list && "hidden", galary2 && "line-clamp-none lg:text-[22px] xl:text-2xl sm:text-lg")}>{item.name}</p></Link>

            {/* RATE */}
            <Rating
              style={{ maxWidth: galary ? 72 : galary2 ? 95 : 80, display: list ? "none" : "flex" }}
              itemStyles={{ itemShapes: StickerStar, activeFillColor: "#814EFA", inactiveFillColor: "#D3C0FF"}}
              value={item.rating}
              readOnly
              orientation='horizontal'
            />

            {/* COLORS */}
            <div className={cn("hidden", galary2 && "flex flex-wrap gap-2 mt-6")}>
              {
                item.colors.map(color => (
                  <button
                    key={color.id}
                    className={cn("w-9 h-9 rounded-sm border-2 border-gray border-dashed p-[2px]", photoSrc.selectedPhotoId === color.id && "border-black border border-solid")}
                    onClick={() => {
                      const photoSrc = item.photos.find(photo => (photo.color === color.name && photo.status === "M"))

                      setPhotoSrc({ selectedPhotoId: color.id, url: photoSrc?.source as string })
                    }}
                  >
                    <i className="block w-full h-full rounded-sm" style={{ background: color.value }}></i>
                  </button>
                ))
              }
            </div>

            {/* PRICE */}
            {
              loaded
                ? <p className={
                  cn(
                    "font-bold text-xl lg:text-lg md:text-base sm:text-sm max-sm:text-base max-[450px]:text-sm mt-5 mb-4", 
                    galary2 && "mb-0 py-2 text-xl lg:text-2xl md:text-lg sm:text-lg max-sm:text-xl max-[450px]:text-lg mt-auto",
                    list && "mb-0 py-0 text-xl lg:text-2xl md:text-lg sm:text-lg max-sm:text-xl max-[450px]:text-lg"
                  )}>{productPirceManager()}</p>
                : <p className="animate-pulse bg-lightgray py-4 mb-2 rounded-md"></p>
            }
          </div>

          {/* CART BUTTON */}
          <div className={cn("flex justify-between gap-2", !list && "hidden")}>
            {/* Like */}
            <button className="w-1/2 p-2 rounded-xl border border-black flex justify-center items-center" onClick={() => addToFavourite(item)}>
              <HeartSvg stroke={"#FF2947"} fill={isFavorite ? "#FF2947" : "white"} />
            </button>

            {/* Compare */}
            <button className="w-1/2 p-2 rounded-xl border border-black flex justify-center items-center">
                <CompareSvg width="18" height="18" className="fill-black" />
            </button>
          </div>

          <button className={cn("w-full border border-primary rounded-btn px-3 py-2", !list && "hidden")}>
            <span className="lg:text-[16px] md:text-base text-sm text-primary font-medium leading-none">{productCard.buyOneClick}</span>
          </button>
          <button className={cn("w-full border-2 max-sm:border sm:border-[1.5px] border-primary rounded-btn px-3 py-2", list && "bg-primary border-none ", galary && "hidden")} onClick={() => addToCart(item, openModal)}>
            <span className="flex items-center gap-2">
              <CartSvg width="24" height="26" strokeWidth="2" className={cn("min-w-10 stroke-white max-custom-1:h-6 max-sm:h-5", galary2 && "stroke-primary")}/>
              <span className={cn("lg:text-base sm:text-sm text-xs text-primary font-medium leading-none text-center flex-1", list && "text-white md:text-base text-sm")}>{productCard.addToCart}</span>
            </span>
          </button>

          <div className={cn("flex gap-2 w-full", !galary && "hidden")}>
            <button className="flex items-center justify-center p-2 max-sm:p-1 w-1/3 rounded-lg bg-secondary hover:bg-primary group/button" onClick={() => addToCart(item, openModal)}>
                <CartSvg strokeWidth="2" className="w-6 max-sm:w-5 stroke-[#697172] group-hover/button:stroke-white" />
            </button>
            <button className="flex items-center justify-center p-2 max-sm:p-1 w-1/3 rounded-lg bg-secondary hover:bg-primary group/button">
                <CompareSvg strokeWidth="1.7" className="w-6 max-sm:w-5 fill-[#697172] group-hover/button:fill-white" />
            </button>
            <button className="flex items-center justify-center p-2 max-sm:p-1 w-1/3 rounded-lg bg-secondary hover:bg-primary group/button" onClick={() => addToCart(item, openModal)}>
                <OneClickSvg strokeWidth="1.7" className="w-6 max-sm:w-5 stroke-[#697172] group-hover/button:stroke-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard) 