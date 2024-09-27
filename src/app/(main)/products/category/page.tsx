"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { publicFetch } from '@/lib/requests'
import { useLanguageStore } from '@/store/lang-store'

import { Category } from '@/types/models/category.model'

type PageProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
type CategoriesStateType = { loading: boolean, error: unknown, data: Category[] }

const CategorysPage = ({params, searchParams}: PageProps) => {
    const fetchCategories = publicFetch<CategoriesStateType>(false)

    const { lang } = useLanguageStore()

    const [categories, setCategories] = useState<CategoriesStateType>({ loading: true, error: false, data: [] })

    useEffect(() => {
        fetchCategories("/product/categories/", setCategories)
    }, [])

    if (categories.loading) return <div className='container'>LOADING</div>

    if (categories.error) return <div className='container'>ERROR</div>

    return (
        <div className='container grid custom-1:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5'>
            {
                categories.data?.map(item => (
                    <div className='flex items-center justify-center bg-lightgray rounded-lg' key={item.id}>
                        <div className='sm:p-5 p-2 flex flex-col justify-between w-2/3 h-full'>
                            <Link href={`/products/category/${item.slug}`} className='flex-1 flex justify-center items-center' key={item.id}>
                                <Image
                                    src={item.icon}
                                    alt={item.translations[lang].name}
                                    width={200}
                                    height={200}
                                    objectFit='cover'
                                    className='sm:h-2/3 h-2/3 object-contain'
                                />
                            </Link>
                            <Link className='text-center block sm:text-lg text-sm' href={`/products/category/${item.slug}`}>{item.translations[lang].name}</Link>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CategorysPage