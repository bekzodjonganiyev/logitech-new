"use client"

import { PlusOutlinedSvg } from '@/components/icons'
import { AddressSection, NoAddressFallback } from '@/components/user-profile-parts/address-setion'
import { Header, HeaderAction, HeaderTitle } from '@/components/user-profile-parts/header'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

const addresses = []

const Page = () => {
  const { lang } = useLanguageStore()
  const { profilePage } = getDictionaryObject(lang)

  return (
    <div className='relative pt-8'>
      <Header className='flex items-center'>
        <HeaderTitle title={profilePage.address.title}/>

        <HeaderAction className=''>
          <PlusOutlinedSvg className='max-custom-1:size-6'/>
          <span className='text-white max-custom-1:text-xs'>{profilePage.address.addNew}</span>
        </HeaderAction>
      </Header>

      {
        addresses.length === 0
          ? <NoAddressFallback />
          : <AddressSection />
      }
    </div>
  )
}

export default Page