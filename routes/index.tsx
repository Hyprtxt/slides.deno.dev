import { Head } from "$fresh/runtime.ts"
import Carousel from "@/islands/Carousel.jsx"
import Header from "@/components/Header.jsx"
import Slideshow from "@/islands/Slideshow.jsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Slides</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Header />
        <p class="my-6">
          Here's a nice little Slideshow with auto-start and keyboard controls.
        </p>
        <Slideshow automatic showNavigation interval={3000} currentSlide={0} />
        <p>
          <a href="https://github.com/Hyprtxt/slides.deno.dev/blob/main/islands/Slideshow.jsx">
            View Island Source Code Here
          </a>
        </p>
        <p class="my-6">This one has a Carousel transtion effect</p>
        <Carousel automatic showNavigation interval={3000} currentSlide={0} />
        <p>
          <a href="https://github.com/Hyprtxt/slides.deno.dev/blob/main/islands/Carousel.jsx">
            View Island Source Code Here
          </a>
        </p>
      </div>
    </>
  )
}
