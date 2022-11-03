<script lang="ts">
  export let click = () => null;
  export let size = 2.5;
  export let side: 'left' | 'right' = 'left';
</script>

<button class="fixed top-1/2 {side === 'left' ? 'left-0' : 'right-0'} h-[{size}rem] mx-8 mt-[-{size}rem] [&>svg]:h-full [&>svg]:fill-primary" on:click={click}>
  <slot/>
</button>