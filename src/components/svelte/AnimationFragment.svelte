<script lang="ts">
  import { onMount } from 'svelte';

	const OPTIMISE_SSR = false;
	let opacity = 0;
	export let className = '';
	export let visible = OPTIMISE_SSR;

	onMount(() => {
    opacity = 1;
		visible = !OPTIMISE_SSR;
		if (OPTIMISE_SSR) setTimeout(() => (visible = true), 350);
  });
</script>

<div class={className}>
  {#if visible}
    <slot />
  {/if}
</div>