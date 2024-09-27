"use client"

import { Header, HeaderTitle } from '@/components/user-profile-parts/header'
import { NoReturnedFallback, ReturnedSection } from '@/components/user-profile-parts/returned-section'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

const returned = []

const Page = () => {
  const { lang } = useLanguageStore()
  const { profilePage } = getDictionaryObject(lang)

  return (
    <div className='pt-8'>
      <Header className='flex items-center mb-5'>
        <HeaderTitle title={profilePage.returned.title} />
      </Header>

      {
        returned.length === 0
          ? <NoReturnedFallback />
          : <ReturnedSection />
      }

    </div>
  )
}

export default Page