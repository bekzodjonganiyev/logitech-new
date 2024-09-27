import { Suspense } from "react"

import { fetcher } from "@/lib/fetcher"
import ProductDetailClient from "./client-page"

import { ProductDetail } from "@/types/models/product.model"

async function getProductDetails(id: string) {
    const res: ProductDetail = await fetcher(`/product/products/${id}`, { next: { revalidate: 60 } })

    if (res) {
        return { data: res, error: null }
    } else {
        console.log('Error')
        return { data: null, error: 'Error' }
    }
}

type PageProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ params, searchParams }: PageProps) => {
    const { data, error } = await getProductDetails(params.slug)

    if (error) {
        return <div className="container h-full flex justifiy-center items-center">Error</div>
    }

    return (
        <Suspense fallback={<></>}>
            <ProductDetailClient pageParams={{}} data={data} />
        </Suspense>
    )
}

export default Page 