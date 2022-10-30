<script lang="ts">
  import { onMount } from 'svelte';

	let opacity = 0;
	export let className = '';
	export let visible = true;

	onMount(() => {
    opacity = 1;
		visible = false;
		setTimeout(() => (visible = true), 10);
  });
</script>

<div style="opacity: {opacity}" class={className}>
  {#if visible}
    <slot />
  {/if}
</div>