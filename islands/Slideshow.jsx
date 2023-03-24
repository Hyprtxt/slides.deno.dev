import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-right.tsx"
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-left.tsx"
import { asset } from "$fresh/runtime.ts"
import { tw } from "twind"

const SLIDE_DATA = [
  { url: asset("/snow_den.png"), alt: "snowy deno" },
  { url: asset("/v1.png"), alt: "deno world is raining" },
  { url: asset("/deno_news.png"), alt: "deno news" },
  { url: asset("/deno_city.jpeg"), alt: "deno city" },
]

const Slide = (props) => {
  const { index, data } = props
  if (props.class === undefined) props.class = ""
  return (
    <img
      src={data.url}
      alt={data.alt}
      index={index}
      class={props.class}
    />
  )
}

const Slideshow = (props) => {
  const NAVIGATION_COLOR = `text-white`
  const CHEVRON_STYLE =
    `absolute z-10 w-10 h-10 hover:text-grey ${NAVIGATION_COLOR} cursor-pointer`
  const SHOW_NAVIGATION = props.showNavigation === false ? false : true
  const SLIDE_INTERVAL = parseInt(props.interval)
    ? parseInt(props.interval)
    : 3500
  const currentSlide = useSignal(
    parseInt(props.currentSlide) ? parseInt(props.currentSlide) : 0,
  )
  const automatic = useSignal(props.automatic ? true : false)
  const slideshow = useRef(null)

  const slideClasses = (idx = 0) =>
    tw`slide absolute top-0 left-0 transition-all ease-in-out duration-700 transform ${
      currentSlide.value === idx ? "opacity-1" : "opacity-0"
    }`

  const nextSlide = () => {
    const numberSlides = slideshow.current.querySelectorAll(".slide")
    if (numberSlides.length === currentSlide.value + 1) {
      currentSlide.value = 0
    } else {
      currentSlide.value++
    }
  }

  const previousSlide = () => {
    const numberSlides = slideshow.current.querySelectorAll(".slide")
    if (currentSlide.value === 0) {
      currentSlide.value = numberSlides.length - 1
    } else {
      currentSlide.value--
    }
  }

  const chevronClick = (doCallback = () => {}) => {
    if (automatic.value) automatic.value = false
    return doCallback()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (automatic.value) nextSlide()
    }, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const ArrowKeyNavigation = () => {
    const keydownHandler = (event) => {
      if (automatic.value) automatic.value = false
      switch (event.code) {
        case "ArrowLeft":
          event.preventDefault()
          previousSlide()
          break
        case "ArrowRight":
          event.preventDefault()
          nextSlide()
          break
        default:
          break
      }
    }
    document.addEventListener("keydown", keydownHandler)
    return () => document.removeEventListener("keydown", keydownHandler)
  }
  useEffect(ArrowKeyNavigation, [])

  const goToSlide = (slide_index = 0) => {
    if (automatic.value) automatic.value = false
    currentSlide.value = slide_index
  }

  const DotsNavigation = () => {
    return (
      <div
        class={`slide_nav w-full ${NAVIGATION_COLOR} absolute bottom-0 flex justify-center cursor-pointer`}
      >
        {SLIDE_DATA.map((_item, idx) => {
          return (
            <div
              class="px-1 hover:text-grey"
              onClick={() => {
                goToSlide(idx)
              }}
            >
              {idx === currentSlide.value ? <>●</> : <>○</>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div
        ref={slideshow}
        class={`slideshow relative flex-1 flex-end p-0 overflow-hidden ${
          props.class !== undefined ? props.class : ""
        }`}
      >
        <IconCircleChevronsLeft
          class={`left-0 ${CHEVRON_STYLE}`}
          style="top: calc(50% - 20px)"
          onClick={() => chevronClick(previousSlide)}
        />
        <IconCircleChevronsRight
          class={`right-0 ${CHEVRON_STYLE}`}
          style="top: calc(50% - 20px)"
          onClick={() => chevronClick(nextSlide)}
        />
        {SLIDE_DATA.map((item, idx) => (
          <Slide
            data={item}
            index={idx}
            class={slideClasses(idx)}
          />
        ))}
        {SHOW_NAVIGATION &&
          <DotsNavigation />}
        <Slide
          data={SLIDE_DATA[0]}
          class="opacity-0 pointer-events-none"
        />
      </div>
    </>
  )
}

export default Slideshow
