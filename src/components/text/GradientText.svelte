<script lang="ts">
	export let className = "";
  export let type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" = "h1";
</script>

<svelte:element
  class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${className}`}
  this={type}>
  <slot />
</svelte:element>
