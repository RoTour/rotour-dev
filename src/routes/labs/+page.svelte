<script lang="ts">

	import Back from '@components/navigation/Back.svelte';
	import { onMount } from 'svelte';
	import { getCurrentBreakPoint } from '../../utils/tailwind-helper';
	import CategoryItem from "./CategoryItem.svelte";

	let navBarHeight: number;

	let blockTranslate = 'translateY(0px)';

	onMount(() => {
		document.body.style.overflow = 'unset';
		// get mouse position

		document.addEventListener('mousemove', (e) => {
			if (getCurrentBreakPoint()[1] === 'sm') return
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;
			blockTranslate = `translate(${ x * 50 - 25 }px, ${ y * 50 - 25 }px)`;
		});
	});

	$: if (navBarHeight) {
		console.log(navBarHeight);
	} else {
		console.log('no ref');
	}
	$: blockHeight = navBarHeight ? `calc(100vh - ${ navBarHeight }px)` : 0;
</script>

<Back bind:height={navBarHeight}/>
<div style={`height: ${blockHeight}; transform: ${blockTranslate}`} class={`
  flex flex-col gap-4 mt-12 w-screen lg:mx-auto
  [&_h2>*]:font-poppins-bold [&_h2>*]:text-5xl
`}>
  <CategoryItem name="Web Development" />
  <CategoryItem name="CSS Challenges" />
  <CategoryItem name="Docker labs" />
</div>