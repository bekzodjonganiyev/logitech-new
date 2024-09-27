"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"
import "./banner-slider.css"

import { Banner } from "@/types/models/banner.model"
import { useMediaQuery } from "@/hooks/use-media-query"

export const BannerSlider = ({ bannerImages }: { bannerImages: Banner[] }) => {
  const isMobile = useMediaQuery("(max-width: 500px)")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  }, 
  [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 4000)
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ])

  return (
    <div className="md:container banner-slider">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {
            bannerImages?.map(item => (

              <div key={item.id} className="keen-slider__slide">
                <Image
                  src={isMobile ? item.photo_sm ?? item.photo : item.photo}
                  alt="banner image"
                  width={2880}
                  height={1155}
                  className="h-full w-full object-cover"
                />
              </div>
            ))
          }
        </div>
        
        {loaded && slider.current && (
          <div className="md:hidden">
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || slider.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || slider.current?.next()
              }
              disabled={
                currentSlide ===
                slider.current.track.details?.slides.length - 1
              }
            />
          </div>
        )}
      </div>

      <div className="max-md:hidden">
        {loaded && slider.current && (
          <div className="dots">
            {[
              ...Array(slider.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider.current?.moveToIdx(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`w-5 h-5 arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
