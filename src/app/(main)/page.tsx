"use client"

import { useEffect, useState } from "react";

import { BannerSlider } from "@/components/slider";
import { CategoryCards } from "@/components/card";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards/infinite-moving-cards";
import { ProductsGrid } from "@/components/products-grid";
import { GHub, LogiOptions, MxSeries } from "@/components/features-banner"
import { AstroSvg, JaybirdSvg, Logitech2Svg, LogitechGSvg } from "@/components/icons";
import { ProductGridTabs } from "@/components/products-grid/product-grid-tabs";
import { GridSkelton } from "@/components/products-grid/grid-skelton";

import { categoryCardData } from "@/lib/const-data"
import { publicFetch } from "@/lib/requests"

import { Product } from "@/types/models/product.model"
import { Banner } from "@/types/models/banner.model"

type ProductsStateType = { loading: boolean, error: unknown, data: Product[] }
type BannersStateType = { loading: boolean, error: unknown, data: Banner[] }

const fetchProducts = publicFetch<ProductsStateType>(true)
const fetchBanners = publicFetch<BannersStateType>(false)

export default function Home() {

  const [products, setProducts] = useState<ProductsStateType>({ loading: true, error: false, data: [] })
  const [banners, setBanners] = useState<BannersStateType>({ loading: true, error: false, data: [] })

  useEffect(() => {
    fetchProducts("/product/products/", setProducts)
    fetchBanners("/offers/banner/?is_active=true", setBanners)
  }, [])

  return (
    <div className="">
      {/* <h1 className="invisible">Logitech Official store in Uzbekistan , Tashkent</h1> */}

      {
        banners.loading
          ? <div className="container"><div className="rounded-xl bg-lightgray animate-pulse h-[486px] flex items-center justify-center">Loading...</div></div>
          : <BannerSlider bannerImages={banners.data} />
      }

      <div className="container my-10">
        <InfiniteMovingCards
          items={[
            { url: "Logitech", icon: <Logitech2Svg /> },
            { url: "Astro", icon: <AstroSvg /> },
            { url: "LogitechG", icon: <LogitechGSvg /> },
            { url: "Jaybird", icon: <JaybirdSvg /> },
          ]}
          speed="normal"
          pauseOnHover
        />
      </div>

      <div className="container grid md:grid-cols-8 grid-cols-2 custom-1:gap-10 gap-5 custom-1:h-[450px] h-[400px] overflow-hidden mb-10 max-md">
        <CategoryCards {...categoryCardData.headphone} className="md:items-start md:col-span-3 md:justify-between justify-evenly pb-6 bg-custom-gradient-4" imgClassName="md:-mt-16 lg:-mt-20 sm:mt-1 -ml-4 max-custom-1:w-72 max-md:w-32" wh={{w:361, h:504}} />

        <div className="md:flex hidden flex-col custom-1:gap-10 gap-5 col-span-3 h-full">
          <CategoryCards {...categoryCardData.keyboard} className="h-1/2 md:justify-between justify-evenly pb-3 pt-2 bg-custom-gradient-2" imgClassName="mb-5" />
          <CategoryCards {...categoryCardData.mouse} className="h-1/2 md:justify-between justify-evenly pb-3 pt-2 bg-custom-gradient-3" imgClassName="mb-5" />
        </div>

        {/* View only mobile */}
        <CategoryCards {...categoryCardData.keyboard} className="py-0 max-md:flex items-center md:justify-between justify-evenly hidden bg-custom-gradient-2" imgClassName="min-w-[250px] object-cover -rotate-12" />
        <CategoryCards {...categoryCardData.mouse} className="py-0 max-md:flex items-center md:justify-between justify-evenly hidden bg-custom-gradient-3" imgClassName="w-40" />

        <CategoryCards {...categoryCardData.camera} className="md:col-span-2 md:justify-between justify-evenly pb-8 px-2 bg-custom-gradient-1" imgClassName="md:mb-10 max-md:w-16" />
      </div>

      <ProductGridTabs />

      <MxSeries />

      {
        products.loading
          ? <GridSkelton />
          : <ProductsGrid
            gridType="galary2"
            items={products.data.slice(0, 8)}
            className="container grid md:grid-cols-2 grid-cols-1 custom-1:gap-[60px] gap-[30px] mb-10"
          />
      }

      <GHub />

      <LogiOptions />

    </div>
  );
}

