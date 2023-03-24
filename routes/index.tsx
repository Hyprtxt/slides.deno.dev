import { Head } from "$fresh/runtime.ts";
import Slideshow from "@/islands/Slideshow.jsx";
import Header from "@/components/Header.jsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Slides</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Header />
        <p class="my-6">
          Here's a nice little slideshow with auto-start and keyboard controls.
        </p>
        <Slideshow />
        <p><a href="https://github.com/Hyprtxt/slides.deno.dev/blob/main/islands/Slideshow.jsx">View Island Source Code Here</a></p>
      </div>
    </>
  );
}
