<script lang="ts">
  export let className = "";
  export let type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" = "h1";
  export let gradientType: "linear" | "symmetric" = "linear";
</script>

<svelte:element
  class={`text-transparent bg-clip-text bg-gradient-to-r
    ${gradientType === 'linear' ? 'from-primary via-primary to-secondary' : 'from-primary via-secondary to-primary' }
    ${className}`}
  this={type}>
  <slot />
</svelte:element>
