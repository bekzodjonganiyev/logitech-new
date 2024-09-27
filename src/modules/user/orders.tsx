"use client"

import dynamic from 'next/dynamic'
// import { useQuery } from '@tanstack/react-query'
// import { AxiosError, AxiosResponse } from 'axios'

import { Header, HeaderTitle } from './components/header'
import { OrdersSectionFallback, OrdersList, OrdersItem } from './components/orders'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'
// import { orderService } from './services/order'

import { Orders as OrdersProps } from '@/types/models/order.model'

const OrdersSectionTabs = dynamic(
  () => import("./components/orders").then((mod) => mod.OrdersSectionTabs),
  { ssr: false, loading: () => <>Loading</> }
)

export const Orders = ({ orders }: { orders: OrdersProps }) => {
  const { lang } = useLanguageStore()
  const { profilePage } = getDictionaryObject(lang)

  // useQuery<AxiosResponse<{ ok: string }>, AxiosError>({
  //   queryKey: ["ok"],
  //   queryFn: () => orderService.getOrders({search: "mx"}),
  //   refetchOnWindowFocus: false,
  // })


  return (
    <div className='pt-8'>
      <Header className='flex items-center mb-5'>
        <HeaderTitle title={profilePage.order.title} />
      </Header>

      <div>
        <OrdersSectionTabs />

        {
          orders.length === 0
            ? <OrdersSectionFallback />
            : <OrdersList>
              {
                orders.map(item => (
                  <OrdersItem key={item.id} ordersItem={item} />
                ))
              }
            </OrdersList>
        }
      </div>
    </div>
  )
}
