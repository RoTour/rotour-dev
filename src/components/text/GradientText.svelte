<script lang="ts">
	export let additionalClasses = '';
	export let type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' = 'h1';
</script>

<svelte:element this={type} class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
  <slot />
</svelte:element>
