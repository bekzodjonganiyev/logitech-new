import Link from "next/link";
import Image from "next/image";
import { LogitechSvg } from "../icons";
import mxSeries from "../../../public/images/mx-series.png";

import { useLanguageStore } from "@/store/lang-store";
import { getDictionaryObject } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

export const MxSeries = () => {
  const { lang } = useLanguageStore();
  const { featureBanners } = getDictionaryObject(lang);

  return (
    <div className={cn(`w-full mb-10 bg-[#DEDEDE]`)}>
      <div className="container flex max-sm:flex-col">
        <div className="flex flex-col justify-evenly w-2/5 max-sm:w-full max-sm:h-60 max-[1400px]:items-center items-start">
          <LogitechSvg className="max-sm:w-16 sm:max-md:w-20"/>
          <h1 className="font-semibold max-sm:text-5xl sm:text-4xl md:text-6xl lg:text-7xl text-8xl max-[1400px]:text-center uppercase">
            {featureBanners.mxSeries.split(" ")[0]} <br /> {featureBanners.mxSeries.split(" ")[1]}
          </h1>
          <Link
            href={"/products/quick-search/mx"}
            className="bg-black px-4 py-2 md:text-sm max-md:text-xs text-white text-center uppercase"
          >
            {featureBanners.allProducts}
          </Link>
        </div>
        <Image src={mxSeries} alt="mx-series" className="md:pt-10 md:ml-auto max-sm:mx-auto w-3/5 max-sm:w-full" />
      </div>
    </div>
  );
};
