<script lang="ts">
	export let additionalClasses = '';
	export let type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' = 'h1';
</script>

{#if type === 'h1'}
  <h1
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h1>
{:else if type === 'h2'}
  <h2
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h2>
{:else if type === 'h3'}
  <h3
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h3>
{:else if type === 'h4'}
  <h4
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h4>
{:else if type === 'h5'}
  <h5
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h5>
{:else if type === 'h6'}
  <h6
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </h6>
{:else}
  <p
    class={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary ${additionalClasses}`}>
    <slot/>
  </p>
{/if}
