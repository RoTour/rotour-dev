<script lang="ts">
  export let click = () => null;
  export let size = 2.5;
  export let side: 'left' | 'right' = 'left';
</script>

<button class="fixed top-1/2 {side === 'left' ? 'left-0' : 'right-0'} mx-8 mt-[-{size}rem] rounded-full
               aspect-square p-[{size/2}rem] flex justify-center items-center transition-all duration-200
               [&>svg]:h-full [&>svg]:fill-primary
               hover:[&>svg]:fill-white hover:bg-primary hover:scale-120"
        on:click={click}
        style="height: {size}rem; width: {size}rem;">
  <slot />
</button>
