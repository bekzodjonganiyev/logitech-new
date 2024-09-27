"use client"

import { useState, useEffect } from "react"

import { ProductFilters } from '@/components/product-filters'
import { ProductsGrid, ProductsGridHeader } from '@/components/products-grid'
import { GridSkelton } from "@/components/products-grid/grid-skelton"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

import { cn } from "@/lib/utils"
import { publicFetch } from "@/lib/requests"
import { arrayFromLen } from "@/lib/generateArrayFromLength"
import { useMediaQuery } from "@/hooks/use-media-query"
import useUpdateSearchParams from "@/hooks/use-update-search-params"

import { Product } from "@/types/models/product.model"

type PageProps = { params: { slug: string }, searchParams: { [key: string]: string } }
type ProductsStateType = { loading: boolean, error: unknown, data: any }

const fetchProducts = publicFetch<ProductsStateType>(false)

const CategoryPage = ({ params, searchParams }: PageProps) => {

  return (
    <div className='container flex gap-[20px] transition-all duration-200'>
      <ProductFilters url={`/product/categories/${params.slug}`} className='flex-col gap-10 lg:w-[290px] w-[240px] custom-1:flex hidden' />
      <GridAndHeaderWrapper slug={params.slug} searchPrams={searchParams} />
    </div>
  )
}

export default CategoryPage


const GridAndHeaderWrapper = ({ slug, searchPrams }: { slug: string, searchPrams: { [key: string]: string } }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { updateSearchParams, deleteSearchParam } = useUpdateSearchParams()

  const params = new URLSearchParams(searchPrams) // returns parasms length get it like this {params.size} 

  const [gridType, setGridType] = useState<"galary" | "galary2" | "list">("galary")
  const [products, setProducts] = useState<ProductsStateType>({ loading: true, error: false, data: [] })

  const pageCount = Math.ceil(products?.data?.count / 9)

  useEffect(() => {
    fetchProducts(`/product/products/?category=${slug}${params.size > 0 ? `&${params}` : ""}`, setProducts, { cache: "no-store" })
  }, [slug, searchPrams])


  return (
    <div className="flex flex-col w-full">
      <ProductsGridHeader
        className=""
        url={`/product/categories/${slug}`}
        title={slug}
        productCount={!products.loading && products.data.count}
        changeGridType={(gridType) => setGridType(gridType)}
        isMobile={isMobile}
      />
      {
        products.loading
          ? <GridSkelton className="grid-cols-3" />
          : (
            <div className='flex-1 flex flex-col'>
              <ProductsGrid
                className={cn('grid sm:grid-cols-3 grid-cols-2 lg:gap-7 gap-5', gridType === 'list' && 'md:flex flex-col')}
                gridType={(isMobile && gridType === "list") ? "galary" : gridType}
                items={products.data.results}
              />

              <Pagination className="mt-3 py-3 flex items-center justify-center">
                <PaginationContent>
                  {
                    arrayFromLen(pageCount).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink href="" onClick={(e) => { e.preventDefault(); updateSearchParams({ page: page + 1 }) }}>{page + 1}</PaginationLink>
                      </PaginationItem>
                    ))
                  }
                </PaginationContent>
              </Pagination>
            </div>
          )
      }
    </div>
  )
}
