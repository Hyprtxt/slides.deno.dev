import { Head } from "$fresh/runtime.ts";
import Slideshow from "@/islands/Slideshow.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <p class="my-6">
          Here's a nice little slideshow with auto-start and keyboard controls.
        </p>
        <Slideshow />
      </div>
    </>
  );
}
