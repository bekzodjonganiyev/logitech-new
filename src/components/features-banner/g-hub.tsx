import Image from 'next/image'

import gHubGlobe from "../../../public/images/g-hub-2.png"
import { DownloadSvg } from '../icons'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const GHub = () => {
  const { lang } = useLanguageStore()
  const { featureBanners } = getDictionaryObject(lang)

  return (
    <div className=' from-zinc-950 bg-gradient-to-tr to-violet-950'>
      <div className='container py-10 flex max-custom-1:flex-col items-center custom-1:justify-end justify-center gap-10'>
        <Image
          src={gHubGlobe}
          alt='G Hub Desktop Application'
          width={gHubGlobe.width}
          height={gHubGlobe.height}
          className='custom-1:w-1/2 w-2/3 max-md:w-full min-w-[240px]'
        />

        <div className='text-white custom-1:w-1/2'>
          <h2 className='lg:text-5xl text-3xl leading-[0.5] font-bold text-white lg:mb-10 mb-5'>LOGITECH G HUB</h2>

          <p>{featureBanners.gHub.description}</p>

          <p className='lg:mt-10 mt-5 mb-3 font-semibold'>{featureBanners.gHub.subDescription}</p>
          <div className='flex items-center gap-5'>
            <a className='bg-primary px-4 py-2 rounded-btn text-white' href='https://download01.logi.com/web/ftp/pub/techsupport/gaming/lghub_installer.exe' download={"https://download01.logi.com/web/ftp/pub/techsupport/gaming/lghub_installer.exe"}>
              <span className='flex items-center gap-2'>{featureBanners.gHub.downloadForWindows} <DownloadSvg /></span>
            </a>
            <a className='bg-primary px-4 py-2 rounded-btn text-white' href='https://download01.logi.com/web/ftp/pub/techsupport/gaming/lghub_installer.zip' download={"https://download01.logi.com/web/ftp/pub/techsupport/gaming/lghub_installer.zip"}>
              <span className='flex items-center gap-2'>{featureBanners.gHub.downloadForMacOS} <DownloadSvg /></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
