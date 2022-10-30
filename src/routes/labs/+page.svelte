<script lang="ts">
	import Back from '@components/navigation/Back.svelte';
	import { onMount } from 'svelte';
	import { getCurrentBreakPoint } from '../../utils/tailwind-helper';
	import { fade } from 'svelte/transition';
	import CategoryItem from './CategoryItem.svelte';
	import AnimationFragment from '@components/svelte/AnimationFragment.svelte';
	import { goto } from "$app/navigation";

	let blockTranslate = 'translateY(0px)';
	let destination = '';
	let visible = true;

	onMount(() => {
		document.body.style.overflow = 'unset';
		console.log('Current device:', getCurrentBreakPoint());

		document.addEventListener('mousemove', (e) => {
			if (getCurrentBreakPoint()[1] === 'sm' || getCurrentBreakPoint()[1] === 'md') return;
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;
			blockTranslate = `translate(${ x * 50 - 25 }px, ${ y * 50 - 25 }px)`;
		});
	});

	const beforeNavigating = (event) => {
		destination = event.detail;
		visible = false;
	};
</script>

<AnimationFragment visible={visible}>
  <div transition:fade on:outroend={() => goto(destination)}>
    <Back links={[{name: "Home", href: "/"}]} on:navigate={beforeNavigating}/>
    <div style={`transform: ${blockTranslate}`} class={`
    flex flex-col gap-4 mt-12 w-screen lg:mx-auto select-none
    [&_h2>*]:font-poppins-bold [&_h2>*]:text-5xl
  `}>
      <CategoryItem name="Web Development"/>
      <CategoryItem name="CSS Challenges"/>
      <CategoryItem name="Docker labs"/>
    </div>
  </div>
</AnimationFragment>
