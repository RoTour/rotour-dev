<script lang="ts">
	import SecondaryBtn from '@components/buttons/SecondaryBtn.svelte';
	import BgDecoration from '@components/background/BgDecoration.svelte';
	import { fly } from 'svelte/transition';
	import { fadeAndScale } from '../transitions/fade-and-scale';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let show = false;
	let animationRunning = false;
	let redirect: string | null = null;

	const animateExit = (nextUrl: string) => {
		if (animationRunning) return;
		console.log('animateExit');
		show = false;
		setAnimationState(true);
		redirect = nextUrl;
	};

	onMount(() => {
		document.body.style.overflow = 'hidden';
		show = true;
	});

	const setAnimationState = (state: boolean) => {
		console.log('setAnimationState', state);
		animationRunning = state;
	};

	$: if (redirect && !animationRunning) {
		goto(redirect);
	}

	$: {
		console.log('animation running: ', animationRunning);
	}


</script>


{#if show}
  <span in:fly={{duration: 800, x: -150, delay: 300}} out:fly={{duration: 800, x: -150}} class="block">
    <BgDecoration posTop="0" posLeft="0" width="25vw" height="25vw" rotate="45deg" translateY="-55%"
                  translateX={"0%"}/>
  </span>
  <span in:fly={{duration: 800, x: 150, delay: 300}} out:fly={{duration: 800, x: 150}}
        class="block absolute bottom-0 right-0">
    <BgDecoration posBottom="0" posRight="0" width="40vw" height="40vw" rotate="-135deg" translateY="60%"
                  translateX={"0%"}/>
  </span>

  <section class="h-screen flex flex-col justify-center"
           in:fadeAndScale={{ duration: 800, invert: true, maxScale: 2}}
           out:fadeAndScale={{ duration: 600, delay: 300, inverted: true, maxScale: 1.4 }}
           on:outroend={() => setAnimationState(false)}>
    <h1
      class="w-max mx-auto text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary mb-8">
      <span class="font-poppins-bold">Ro</span>
      <span class="font-poppins-bold text-black">::</span>
      <span class="font-poppins-bold">Tour</span>
    </h1>

    <div class="w-full p-4 md:w-1/2 lg:w-1/3 mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
      <SecondaryBtn onClick={() => animateExit('/projects')}>(🔨WIP) Projects</SecondaryBtn>
      <SecondaryBtn onClick={() => animateExit('/components')}>(🔨WIP) Components</SecondaryBtn>
      <SecondaryBtn onClick={() => animateExit('/labs')}>(🔨WIP) Labs</SecondaryBtn>
      <SecondaryBtn onClick={() => console.log('test')}>(🔨WIP) Testing</SecondaryBtn>
    </div>
  </section>
{/if}
