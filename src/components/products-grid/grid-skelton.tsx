import React from 'react'

import { Skeleton } from '../ui/skeleton'

import { cn } from '@/lib/utils'

export const GridSkelton = ({ className }: { className?: string }) => {
    return <div className={cn('w-full grid min-[1150px]:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-7', className)}>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div key={i} className='border border-gray rounded-card p-3 h-fit'>
                    <div className="relative">
                        <button className="animate-pulse absolute sm:w-10 w-9 sm:h-10 h-9 rounded-full top-0 right-0 bg-darkgray">
                        </button>

                        <Skeleton className="w-full bg-lightgray h-[200px]" />

                        <Skeleton className='h-5 mt-5 bg-lightgray' />
                        <Skeleton className='h-5 mt-5 bg-lightgray' />
                        <Skeleton className='h-5 mt-5 bg-lightgray' />

                        <Skeleton className='h-10 mt-5 bg-gray' />
                    </div>
                </div>
            ))
        }
    </div>
}
