import React from 'react'

export const ParametrsAndActionsSkelton = () => {
    return (
        <div className="border border-gray rounded-category-product-card p-[19px] animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between gap-1 mb-2 last:mb-0">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="flex-1 border-b border-dashed border-darkgray"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <hr className="my-8 border" />
            <div className="flex flex-col justify-end gap-y-3">
                <div className="flex items-center gap-2 justify-between box-border">
                    <div className="border text-sm text-gray px-1 py-2 rounded-lg box-border">
                        <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="border text-sm text-gray px-1 py-2 rounded-lg box-border">
                        <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="bg-primary p-[10px] text-white font-semibold rounded-xl">
                    <div className="h-6 w-28 bg-gray-200 rounded"></div>
                </div>
                <div className="text-primary border border-primary rounded-xl p-[10px] text-base font-semibold">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-lightgray text-darkgray rounded-xl p-[10px] text-base">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    )
}
