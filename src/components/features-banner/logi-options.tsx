import logiOptions from "../../../public/images/logi-options.png"
import { DownloadSvg } from '../icons'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const LogiOptions = () => {
  const { lang } = useLanguageStore()
  const { featureBanners } = getDictionaryObject(lang)

  return (
    <div className='pt-24 max-custom-1:pt-16'>
      <div className='lg:w-[720px] mx-auto'>
        <h2 className='lg:text-5xl text-3xl text-center font-bold lg:mb-10 mb-5'>LOGI OPTIONS+</h2>

        <p className='text-center mb-10'>{featureBanners.logiOptions.description}</p>

        <div className='flex items-center justify-center gap-5'>
          <a className='bg-black px-4 py-2 rounded-btn text-white' href='https://download01.logi.com/web/ftp/pub/techsupport/options/options_installer.exe' download={"https://download01.logi.com/web/ftp/pub/techsupport/options/options_installer.exe"}>
            <span className='flex items-center gap-2 text-white'>{featureBanners.logiOptions.downloadForWindows} <DownloadSvg /></span>
          </a>
          <a className='bg-black px-4 py-2 rounded-btn text-white' href='https://download01.logi.com/web/ftp/pub/techsupport/options/options_installer.zip' download={"https://download01.logi.com/web/ftp/pub/techsupport/options/options_installer.zip"}>
            <span className='flex items-center gap-2 text-white'>{featureBanners.logiOptions.downloadForMacOS} <DownloadSvg /></span>
          </a>
        </div>
      </div>

      <div
        className='w-full mb-10 bg-no-repeat bg-cover lg:bg-[position:100%_30%] sm:bg-[position:40%_40%] bg-[position:30%_30%] h-[60vh] min-h-[400px]'
        style={{
          backgroundImage: `url('${logiOptions.src}')`,
        }}
      >
      </div>
    </div>
  )
}
