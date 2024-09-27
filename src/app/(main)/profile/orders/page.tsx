import { Suspense } from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Metadata } from "next"

import { Orders } from "@/modules/user/"

import { orderService } from "@/modules/user"

export const metadata: Metadata = {
  title: "Logitech Official Store | Orders"
}

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string }
}

const Page = async (props: PageProps) => {
  const token = cookies().get("access")

  const data = await orderService.getOrders(props.searchParams, token?.value)

  if (data.status === 401) return redirect("/")

  return (
    <Suspense fallback={<>Loading</>}>
      <Orders orders={data.data}/>
    </Suspense>
  )
}

export default Page