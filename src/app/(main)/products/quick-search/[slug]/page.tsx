import { Suspense } from 'react'

import { fetcher } from '@/lib/fetcher'

import { ProductsGrid } from '@/components/products-grid'
import { cn } from '@/lib/utils'

import { Product } from '@/types/models/product.model'
import { GridSkelton } from '@/components/products-grid/grid-skelton'

type PageProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getProductsByTag(id: string) {
    const res: { results: Product[] } = await fetcher(`/product/products/?search=${id}`, { next: { revalidate: 60 } })

    if (res) {
        return { data: res, error: null }
    } else {
        console.log('Error')
        return { data: null, error: 'Error' }
    }
}
const Page = async (props: PageProps) => {
    const { params } = props

    const { data, error } = await getProductsByTag(params.slug)

    if (error) return <div className="container h-full flex justifiy-center items-center">Error</div>

    return (
        <Suspense fallback={<GridSkelton className='container' />}>
            <ProductsGrid
                className={cn('container grid sm:grid-cols-4 grid-cols-2 lg:gap-7 gap-5')}
                gridType={"galary"}
                items={data?.results}
            />
        </Suspense>
    )
}

export default Page