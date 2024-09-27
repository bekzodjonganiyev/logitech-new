import React, { Suspense } from 'react'

import { PersonalInfoForm } from '@/components/user-profile-parts/personal-info-form'
import { privateFetch } from '@/lib/actions'

import { User } from "@/types/models/user.model"
import { Header, HeaderTitle } from '@/components/user-profile-parts/header'

export const metadata = {
  title: "Personal info"
}

const Page = async () => {
  const res = await privateFetch<User>("/customers/me/")

  return (
    <Suspense fallback={<div className='container'>Loading</div>}>
      <div className='pt-8'>
        <Header className='flex items-center mb-5'>
          <HeaderTitle title='Shaxsiy kabinet'/>
        </Header>
        
        <PersonalInfoForm defaults={{
          first_name: res.first_name,
          last_name: res.last_name,
          phone: res.user.phone,
          email: "",
          date: "",
          gender: ""
        }}
        />
      </div>
    </Suspense>
  )
}

export default Page