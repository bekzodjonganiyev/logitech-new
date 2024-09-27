"use client"

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { UserProfileSidebar } from '@/components/user-profile-parts/user-profile-sidebar';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='container flex gap-8 min-h-[500px]'>
            <UserProfileSidebar className={cn(pathname !== "/profile" && "max-custom-1:hidden")}/>

            <div className={cn('flex-1', pathname === "/profile" && "max-custom-1:hidden")}>{children}</div>
        </div>
    )
}

export default Layout