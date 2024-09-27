"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { redirect } from 'next/navigation'
import { z } from "zod"
import { toast } from 'sonner'

import { Form } from "@/components/ui/form"
import { PersonalInfoPart } from '@/components/checkout-page-parts/personal-info-part'
import { AdmissionTypePart } from '@/components/checkout-page-parts/admission-type-part'
import { PaymentTypePart } from '@/components/checkout-page-parts/payment-type-part'
import { Input } from '@/components/ui'

import { useCartStore } from '@/store/cart-store'
import { useCurrencyStore } from '@/store/currency-store'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'
import { priceFormatter } from '@/lib/price-formatter'
import { privateFetch } from "@/lib/requests"
import { fetcher } from '@/lib/fetcher'

import { User } from '@/types/models/user.model'

// TODO - move to utils this function
const productPirceManager = (price: number, currency: { rate: number, name: string }) => {
  const priceA = price * currency.rate
  const priceSymbol = currency.name === "USD" ? "$" : "UZS"

  return `${priceSymbol} ${priceFormatter(priceA, currency.name === "UZS")}`
}

const syncCartWithDb = async (setState: Dispatch<SetStateAction<any>>) => {
  const accessToken = Cookies.get("access")

  const res = await fetcher("/market/cart/", { headers: { "Authorization": `Bearer ${accessToken}`, } })

  if (res) {
    setState(res[0].products)
  }
}

const createSchema = (isOptional: boolean) => {
  const FormSchema = z.object({
    first_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    delivery_type: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    region: !isOptional ? z.string().optional() : z.string(),
    district: !isOptional ? z.string().optional() : z.string(),
    address: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    point: z.string().optional(),
    payment_type: z.string().min(1, {
      message: "Username must be at least 2 characters.",
    })
  })
  return FormSchema
}

type UserStateType = { loading: boolean, error: unknown, data: User }

const Page = () => {
  const { carts, setAll } = useCartStore()
  const currency = useCurrencyStore(state => state.currency)
  const { lang } = useLanguageStore()
  const { checkoutPage, cartsPage } = getDictionaryObject(lang)

  const [isOptional, setIsOptional] = useState(false)
  const schema = createSchema(isOptional)
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: {} })

  const [userData, setUserData] = useState<UserStateType>({ loading: true, data: {}, error: null } as UserStateType)

  async function onSubmit(data: z.infer<typeof schema>) {
    const accessToken = Cookies.get("access")

    if (data.delivery_type === "true") {
      const a = data.region + " , " + data.district + " , "
      data.address = a + data.address
    }

    const res = fetcher("/market/order/confirm/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + `${accessToken}`,
      }
    })

    toast.promise(res, {
      position: "top-center",
      loading: 'Yuklanmoqda...',
      success: (data) => {
        if (data) {
          setTimeout(() => {
            window.location.href = data.link
          }, 1000);
        }
        return `${data.message}`;
      },
      error: "Xatolik sodir bo'ldi"
    });
  }

  useEffect(() => {
    syncCartWithDb(setAll)
    privateFetch<UserStateType>(false)("/customers/me/", setUserData)
  }, [])

  useEffect(() => {
    if (!userData.loading) {
      form.resetField("first_name", { defaultValue: userData.data.first_name })
      form.resetField("last_name", { defaultValue: userData.data.last_name })
    }
  }, [userData.data])

  type Cart = typeof carts[0]
  const totalPrice = carts.reduce((acc: number, cart: Cart) => acc + (cart.price * cart.qty), 0);
  const tax = totalPrice * (12 / 100)
  const totalPriceWithTax = totalPrice + tax

  if (carts.length === 0) {
    setTimeout(() => {
      redirect("/")
    }, 1000);
  }

  return (
    <div className='container custom-1:my-10 my-5'>
      <h1 className='text-2xl text-center font-medium mb-5'>{checkoutPage.title}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex max-custom-1:flex-col max-custom-1:items-center items-start gap-10'>
          <div className='custom-1:flex-1 sm:w-[80%] w-full bg-white rounded-2xl custom-1:p-10 p-5'>
            {/* YOUR INFORMATION */}
            <PersonalInfoPart phone={userData.data?.user?.phone} />

            {/* ADMISSION METHOD */}
            <AdmissionTypePart getDeliveryType={(e) => {
              if (e === "true") setIsOptional(true)
              else setIsOptional(false)
            }} />

            {/* SELECT PAYMENT METHOD */}
            <PaymentTypePart />
          </div>

          <div className='space-y-10 custom-1:min-w-96 custom-1:w-96 sm:w-[80%] w-full'>
            <div className="bg-white  rounded-2xl p-7">
              <p className="text-lg font-medium mb-5">{checkoutPage.orderedProducts}</p>

              <ul>
                {
                  carts.map(item => (
                    <li key={item.skuId} className='flex items-stretch justify-between gap-5 mb-5 last:mb-0'>
                      <Image
                        src={item.image}
                        alt='Name'
                        width={70}
                        height={100}
                        className='rounded-lg'
                      />
                      <div className='flex flex-col flex-grow gap-2'>
                        <p className='leading-4'>{item.name}</p>
                        <p className='text-darkgray'>Rangi: {item.color.name}</p>
                        <div className='flex justify-between'>
                          <p className='font-semibold'>{productPirceManager(item.price, currency)}</p>
                          <p className='font-semibold'>{item.qty} ta</p>
                        </div>
                      </div>

                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="bg-white  rounded-2xl p-5">
              <p className="text-lg font-medium mb-5">{cartsPage.myOrder.title}</p>

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
                <p className="text-darkgray">{cartsPage.myOrder.title}:</p>
                <span className="flex-1 max-custom-1:border-b border-dashed"></span>
                <p className="font-semibold">{productPirceManager(totalPriceWithTax, currency)}</p>
              </div>

              <br />

              {/* <form action="" className="flex">
                <Input type="text" className="placeholder:text-gray py-6 rounded-xl rounded-r-none focus-visible:ring-0 text-lg" placeholder="promokod kiriting" />
                <button type="submit" className="rounded-btn rounded-l-none bg-primary text-white text-sm px-5">Tasdiqlash</button>
              </form> */}

              <br />

              <button type='submit' className="bg-primary w-full text-center text-white rounded-btn py-3">To&apos;lash</button>
            </div>
          </div>

        </form>
      </Form>

    </div>
  )
}

export default Page