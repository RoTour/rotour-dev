<script lang="ts">
  import { goto } from "$app/navigation";
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import SecondaryBtn from "@components/buttons/SecondaryBtn.svelte";
  import GradientText from "@components/text/GradientText.svelte";
  import { onMount } from "svelte";
  import { backIn, elasticOut, expoOut } from "svelte/easing";
  import { fly, scale } from "svelte/transition";
  import { fadeAndScale } from "../transitions/fade-and-scale";

  let show = false;
  let animationRunning = false;
  let redirect: string | null = null;

  const animateExit = (nextUrl: string) => {
    console.log("animationRunning", animationRunning);
    if (animationRunning) return;
    show = false;
    setAnimationState(true);
    redirect = nextUrl;
  };

  onMount(() => {
    document.body.style.overflow = "hidden";
    show = true;
  });

  const setAnimationState = (state: boolean) => {
    animationRunning = state;
  };

  $: if (redirect && !animationRunning) {
    goto(redirect);
  }
</script>


{#if show}
  <span in:fly={{duration: 700, x: -150, delay: 200, easing: expoOut}} out:fly={{duration: 400, x: -150}} class="block">
    <BgDecoration posTop="0" posLeft="0" width="25vw" height="25vw" rotate="45deg" translateY="-55%"
                  translateX="0%" />
  </span>
  <span in:fly={{duration: 700, x: 150, delay: 200, easing: expoOut}} out:fly={{duration: 400, x: 150}}
        class="block absolute bottom-0 right-0">
    <BgDecoration posBottom="0" posRight="0" width="40vw" height="40vw" rotate="-135deg" translateY="60%"
                  translateX={"0%"} />
  </span>

  <section class="h-screen flex flex-col justify-center">
    <div in:fadeAndScale={{ duration: 600, invert: true, maxScale: 2}}
         out:fadeAndScale={{ duration: 400, delay: 400, inverted: true, maxScale: 1.4 }}
         on:outroend={() => setAnimationState(false)}>
      <GradientText className="w-max mx-auto text-6xl text-center mb-8 animate-moving-bg bg-[length:200%]" type="h1"
                    gradientType="symmetric">
        <span class="font-poppins-bold">Ro</span>
        <span class="font-poppins-bold text-black">::</span>
        <span class="font-poppins-bold">Tour</span>
      </GradientText>
    </div>
    <div class="w-full p-4 md:w-1/2 lg:w-1/3 mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
      <div in:scale={{easing: elasticOut, duration: 1000, delay: 500}}
           out:scale={{easing: backIn, duration: 400, delay: 0}}>
        <SecondaryBtn onClick={() => animateExit('/projects')}>🧳 Projects</SecondaryBtn>
      </div>
      <div in:scale={{easing: elasticOut, duration: 1000, delay: 600}}
           out:scale={{easing: backIn, duration: 400, delay: 100}}>
        <SecondaryBtn onClick={() => animateExit('/labs')}>🧪 Labs</SecondaryBtn>
      </div>
      <div in:scale={{easing: elasticOut, duration: 1000, delay: 700}}
           out:scale={{easing: backIn, duration: 400, delay: 200}}>
        <SecondaryBtn onClick={() => animateExit('/components')}>(🔨WIP) Components</SecondaryBtn>
      </div>
      <div in:scale={{easing: elasticOut, duration: 1000, delay: 800}}
           out:scale={{easing: backIn, duration: 400, delay: 300}}>
        <SecondaryBtn onClick={() => animateExit('/testing')}>(🔨WIP) Testing</SecondaryBtn>
      </div>
    </div>
  </section>
{/if}
