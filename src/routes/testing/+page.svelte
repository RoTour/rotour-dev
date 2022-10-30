<script lang="ts">
	import { fly } from 'svelte/transition';
	import AnimationFragment from '@components/svelte/AnimationFragment.svelte';
	import Back from '@components/navigation/Back.svelte';
	import { goto } from "$app/navigation";

	let visible = true;
  let destination = '';

	const beforeNavigating = (event) => {
		console.log(event);
		destination = event.detail;
		visible = false;
  }
</script>

<div class="h-screen flex flex-col justify-center items-center">
  <Back links={[{name: 'Home', href: '/'}]} on:navigate={beforeNavigating}/>
  <AnimationFragment visible={visible}>
    <h1 class="text-5xl font-poppins-bold"
        in:fly={{y: 100, duration: 1000}}
        out:fly={{y: 100, duration: 1000}}
        on:outroend={() => goto(destination)}>
    >
      Testing things
    </h1>
  </AnimationFragment>
  <button on:click={() => (visible = !visible)} class="border border-black border-4 p-4 rounded-xl m-4">Toggle Visible</button>
</div>
