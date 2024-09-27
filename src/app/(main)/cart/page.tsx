"use client"

import Link from "next/link"
import { Dispatch, SetStateAction, useEffect } from "react"
import Cookie from "js-cookie"

import CartItem from "@/components/cart-elements/cart-item"

import { useCartStore } from "@/store/cart-store"
import { useCurrencyStore } from "@/store/currency-store"
import { priceFormatter } from "@/lib/price-formatter"
import { fetcher } from "@/lib/fetcher"
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'
import { checkTokenIsExpires } from "@/lib/checkAuth"

const productPirceManager = (price: number, currency: { rate: number, name: string }) => {
  const priceA = price * currency.rate
  const priceSymbol = currency.name === "USD" ? "$" : "UZS"

  return `${priceSymbol} ${priceFormatter(priceA, currency.name === "UZS")}`
}

const syncCartWithDb = async (setState: Dispatch<SetStateAction<any>>) => {
  const accessToken = Cookie.get("access")

  const res = await fetcher("/market/cart/", { headers: { "Authorization": `Bearer ${accessToken}`, } })

  if (res) {
    setState(res[0].products)
  }
}

const Page = () => {
  const { lang } = useLanguageStore()
  const { cartsPage } = getDictionaryObject(lang)
  const { carts, setAll } = useCartStore()
  const currency = useCurrencyStore(state => state.currency)
  type Cart = typeof carts[0]

  const totalPrice = carts.reduce((acc: number, cart: Cart) => acc + (cart.price * cart.qty), 0);
  const tax = totalPrice * (12 / 100)
  const totalPriceWithTax = totalPrice + tax

  useEffect(() => {
    if (checkTokenIsExpires()) syncCartWithDb(setAll)
  }, [checkTokenIsExpires()])

  return (
    <div className='container'>
      {
        carts.length > 0
          ? <>
            <h1 className='text-3xl font-semibold mb-5'>{cartsPage.title}</h1>

            <div className="flex max-custom-1:flex-col custom-1:items-start items-center lg:gap-10 gap-5">
              {/* ITEMS */}
              <div className="custom-1:flex-1 sm:w-[80%] w-full border rounded-md lg:p-5 p-3">
                {
                  carts.map(item => (
                    <CartItem key={item.skuId} item={item} qty={item.qty} currency={currency} />
                  ))
                }
              </div>

              {/*  */}
              <div className="custom-1:w-80 sm:w-[80%] w-full border rounded-md p-4">
                <p className="text-xl font-semibold mb-5">{cartsPage.myOrder.title}</p>

                <div className="flex items-center gap-2">
                  <p className="text-darkgray">{cartsPage.myOrder.products}({carts.length}):</p>
                  <span className="flex-1 max-custom-1:border-b border-dashed"></span>
                  <p className="font-semibold">{productPirceManager(totalPrice, currency)}</p>
                </div>

                <div className="flex items-center gap-2 my-2">
                  <p className="text-darkgray">{cartsPage.myOrder.vat}(12%):</p>
                  <span className="flex-1 max-custom-1:border-b border-dashed"></span>
                  <p className="font-semibold">{productPirceManager(tax, currency)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-darkgray">{cartsPage.myOrder.total}:</p>
                  <span className="flex-1 max-custom-1:border-b border-dashed"></span>
                  <p className="font-semibold">{productPirceManager(totalPriceWithTax, currency)}</p>
                </div>

                <br />

                <Link href={"/checkout"} className="bg-primary block text-center text-white rounded-btn py-3">{cartsPage.myOrder.gotoCheckout}</Link>

              </div>
            </div>
          </>
          : <span className="flex items-center justify-center h-96">{cartsPage.noContentDescription}</span>
      }
    </div>
  )
}

export default Page