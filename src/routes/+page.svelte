<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { backIn, elasticOut, expoOut } from "svelte/easing";
  import { fly, scale } from "svelte/transition";

  // Import your app's components
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import SecondaryBtn from "@components/buttons/SecondaryBtn.svelte";
  import GradientText from "@components/text/GradientText.svelte";
  import { fadeAndScale } from "../transitions/fade-and-scale";
	import { isMobile } from "../utils/tailwind-helper";
	import Controls from "@components/controls/ControlsStore.svelte";

  // --- STATE ---
  // Use $state for reactive variables instead of `let`
  let show = $state(false);
  let animationRunning = $state(false);
  let redirect: string | null = $state(null);
  let initialMousePosition: { x: number; y: number } | null = $state(null);
  let blockTranslate = $state("");
  let parallaxEnabled = $derived(Controls.isParallaxEnabled)

  const animateExit = (nextUrl: string) => {
    if (animationRunning) return;
    show = false;
    animationRunning = true;
    redirect = nextUrl;
  };

  const moveBlock = (e: MouseEvent) => {
    if (!parallaxEnabled) return;
    if (!initialMousePosition) {
      initialMousePosition = { x: e.clientX, y: e.clientY + window.innerHeight * 0.1 };
    }
    const x = (e.clientX - initialMousePosition.x) / 16;
    const y = (e.clientY - initialMousePosition.y) / 9;
    blockTranslate = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  };

  // --- LIFECYCLE & EFFECTS ---
  onMount(() => {
    document.body.style.overflow = "hidden";
    if (!isMobile()) document.body.addEventListener("mousemove", moveBlock);
    show = true;

    // Return a cleanup function to run when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("mousemove", moveBlock);
    };
  });

  // Use $effect to react to state changes, replacing the `$: if (...)` block
  $effect(() => {
    if (redirect && !animationRunning) {
      goto(redirect);
    }
  });
</script>

{#if show}
  <div
    in:fly={{ duration: 700, x: -150, delay: 200, easing: expoOut }}
    out:fly={{ duration: 400, x: -150 }}
    class="block absolute top-0 left-0 w-full h-full -z-10"
  >
    <BgDecoration posTop="0" posLeft="0" width="25vw" height="25vw" rotate="45deg" translateY="-55%" translateX="0%" />
  </div>
  <div
    in:fly={{ duration: 700, x: 150, delay: 200, easing: expoOut }}
    out:fly={{ duration: 400, x: 150 }}
    class="block absolute top-0 left-0 w-full h-full -z-10"
  >
    <BgDecoration posBottom="0" posRight="0" width="40vw" height="40vw" rotate="-135deg" translateY="60%" translateX={"0%"} />
  </div>

  <section class="h-screen flex flex-col justify-center" style="transform: {blockTranslate}">
    <div
      in:fadeAndScale={{ duration: 600, invert: true, maxScale: 2 }}
      out:fadeAndScale={{ duration: 400, delay: 400, inverted: true, maxScale: 1.4 }}
      on:outroend={() => (animationRunning = false)}
    >
      <div class="w-min m-auto mb-8">
        <GradientText
          className="w-max mx-auto text-4xl lg:text-6xl text-center animate-moving-bg bg-[length:200%]"
          type="h1"
          gradientType="symmetric"
        >
          <span class="font-poppins-bold">Ro</span>
          <span class="font-poppins-bold text-black">::</span>
          <span class="font-poppins-bold">Tour</span>
        </GradientText>
        <p class="whitespace-nowrap font-poppins-regular opacity-80 text-sm lg:text-xl italic">
          Web Developer & Devops enthusiast
        </p>
      </div>
    </div>
    <div class="w-full p-4 md:w-1/2 lg:w-1/3 mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
      <div in:scale={{ easing: elasticOut, duration: 1000, delay: 500 }} out:scale={{ easing: backIn, duration: 400, delay: 0 }}>
        <SecondaryBtn onClick={() => animateExit("/about")}>⭐️About Me</SecondaryBtn>
      </div>
      <div in:scale={{ easing: elasticOut, duration: 1000, delay: 600 }} out:scale={{ easing: backIn, duration: 400, delay: 100 }}>
        <SecondaryBtn onClick={() => animateExit("/projects")}>🧳 Projects</SecondaryBtn>
      </div>
      <div in:scale={{ easing: elasticOut, duration: 1000, delay: 700 }} out:scale={{ easing: backIn, duration: 400, delay: 200 }}>
        <SecondaryBtn onClick={() => window.open("https://raltech.school", "_blank")}>🧪 RALTech School</SecondaryBtn>
      </div>
      <div in:scale={{ easing: elasticOut, duration: 1000, delay: 800 }} out:scale={{ easing: backIn, duration: 400, delay: 300 }}>
        <SecondaryBtn onClick={() => animateExit("/contact")}>✉️ Contact Me</SecondaryBtn>
      </div>
    </div>
  </section>
{/if}