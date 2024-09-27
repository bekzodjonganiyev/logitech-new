import React, { Suspense } from 'react'
import Head from 'next/head'

import { PersonalInfoForm } from '@/components/user-profile-parts/personal-info-form'
import { privateFetch } from '@/lib/actions'

import { User } from "@/types/models/user.model"

export const metadata = {
  title: "Personal info"
}

const Page = async () => {
  const res = await privateFetch<User>("/customers/me/")

  return (
    <Suspense fallback={<div className='container'>Loading</div>}>

      <div className='pt-8'>
        <h1 className='text-3xl font-semibold mb-5'>Shaxsiy kabinet</h1>
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