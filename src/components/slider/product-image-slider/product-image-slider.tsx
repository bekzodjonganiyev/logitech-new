// "use client"

import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance, KeenSliderOptions } from "keen-slider/react"
import { MutableRefObject, useEffect, useState } from 'react'
import Image from 'next/image'

import "keen-slider/keen-slider.min.css"
import "./product-image-slider.css"

import { ImagesSkeleton, ThunbnailSkelen } from "./prodcut-slider-skeleton"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useProductColorContext } from "@/store/product-color-store"

import { ProductDetail } from "@/types/models/product.model"


export const ProductImageSlider = ({productSliderImages}:{productSliderImages: ProductDetail["photos"] | []}) => {
  const [loaded, setLoaded] = useState(false)

  const { selectedColor } = useProductColorContext()

  const isDesktop: boolean = useMediaQuery("(min-width: 1024px)")
  const isMobile: boolean = useMediaQuery("(max-width: 767px)")

  const thumbnailOptions:KeenSliderOptions  = {
    initial: 0,
    slides: {
      perView: 3,
      spacing: 10,
    },
    vertical: true,
  }

  const thumbnailOptions1:KeenSliderOptions  = {
    initial: 0,
    slides: {
      perView: 4,
      spacing: 10,
    },
    vertical: false,
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ initial: 0 })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(thumbnailOptions, [ThumbnailPlugin(instanceRef)])
  const [thumbnailRef1] = useKeenSlider<HTMLDivElement>(thumbnailOptions1, [ThumbnailPlugin(instanceRef)])

  // const images = selectedColor.id > 0 ? productSliderImages.filter(image => image.color === selectedColor.name) : productSliderImages
  // console.log(images)

  useEffect(() => {
    const imageId = productSliderImages.findIndex(image => (image.color === selectedColor.name && image.status === "M"))
    instanceRef.current?.moveToIdx(imageId > -1 ? imageId : 0)

  }, [selectedColor])

  return (
    <div className={cn('product-image-slider')}>

      {/* IMAGES */}
      <div
        ref={sliderRef}
        className={cn('keen-slider images')}
      >
        <ImagesSkeleton loaded={loaded} />
        {
          productSliderImages.map(item => (
            <div key={item.id} className="keen-slider__slide">
              <Image
                src={item.source}
                alt='Product Image'
                width={350}
                height={450}
                onLoad={() => setLoaded(true)}
                className={cn('w-full h-full object-cover')}
              />
            </div>
          ))
        }
      </div>

      {/* THUMBNAILS */}
      {
        isDesktop
          ? <div ref={thumbnailRef} className={cn("keen-slider thumbnail")}>
            <ThunbnailSkelen loaded={loaded} />
            {
              productSliderImages.map(item => (
                <div className="keen-slider__slide" key={item.id}>
                  <Image
                    key={item.id}
                    src={item.source}
                    alt='Product Image'
                    width={100}
                    height={120}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))
            }
          </div>
          : <>
            {
              isMobile
                ? <div ref={thumbnailRef} className={cn("keen-slider thumbnail")}>
                  <ThunbnailSkelen loaded={loaded} />
                  {
                    productSliderImages.map(item => (
                      <div className="keen-slider__slide" key={item.id}>
                        <Image
                          key={item.id}
                          src={item.source}
                          alt='Product Image'
                          width={100}
                          height={120}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ))
                  }
                </div>
                : <div ref={thumbnailRef1} className={cn("keen-slider thumbnail")}>
                  <ThunbnailSkelen loaded={loaded} />
                  {
                    productSliderImages.map(item => (
                      <div className="keen-slider__slide" key={item.id}>
                        <Image
                          key={item.id}
                          src={item.source}
                          alt='Product Image'
                          width={100}
                          height={120}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ))
                  }
                </div>
            }
          </>
      }
    </div>
  )
}

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}