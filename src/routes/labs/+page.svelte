<script lang="ts">
	import { goto } from '$app/navigation';
	import Back from '@components/navigation/Back.svelte';
	import AnimationFragment from '@components/svelte/AnimationFragment.svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { getCurrentBreakPoint } from '../../utils/tailwind-helper';
	import CategoryItem from './CategoryItem.svelte';

	let blockTranslate = { value: 'translateY(0px)', locked: false };
	let destination = '';
	let visible = true;
	let selectedCategory = '';

	const categories = ['Web Development', 'CSS Challenges', 'Docker Labs'];

	onMount(() => {
		document.body.style.overflow = 'unset';

		document.addEventListener('mousemove', (e) => {
			if (getCurrentBreakPoint()[1] === 'sm' || getCurrentBreakPoint()[1] === 'md') return;
			if (blockTranslate.locked) return;
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;
			blockTranslate.value = `translate(${ x * 50 - 25 }px, ${ y * 50 - 25 }px)`;
		});
	});

	const beforeNavigating = (event) => {
		destination = event.detail;
		visible = false;
		goto(destination)
	};

	const onCategorySelected = (category: 'Web Development' | 'CSS Challenges' | 'Docker labs') => {
		blockTranslate.locked = true;
		selectedCategory = category;
	};
</script>

<AnimationFragment visible={visible}>
  <div transition:fade >
    <Back links={[{name: "Home", href: "/"}]} on:navigate={beforeNavigating}/>
    <div style={`transform: ${blockTranslate.value}`} class="
    flex flex-col gap-4 w-screen lg:mx-auto select-none mt-4 lg:mt-6
    [&_h2>*]:font-poppins-bold [&_h2>*]:text-5xl
  ">
      {#each categories.filter((it) => !selectedCategory || it === selectedCategory) as category, index (category)}
        <div
          on:keydown={() => onCategorySelected(category)}
          on:click={() => onCategorySelected(category)}
          out:fly={{x: -500, duration: 300, delay: 0}}
          animate:flip={{delay: 100, duration: 400}}
        >
          {#key selectedCategory}
            <CategoryItem name={category} expanded={selectedCategory && selectedCategory === category}/>
          {/key}
        </div>
      {/each}
    </div>
  </div>
</AnimationFragment>
