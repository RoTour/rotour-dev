<!--Custom event : on:navigate -->
<script lang="ts">
  import IconLeftArrow from "@components/icons/IconLeftArrow.svelte";
  import { createEventDispatcher } from "svelte";
  import IconCarretRight from "../icons/IconCaretRight.svelte";

  const dispatch = createEventDispatcher();
  export let height = 0;
  export let links: { name: string, href: string }[] = [];
  export let className = "";

  const onNavigate = (href: string) => dispatch("navigate", href);
</script>

<div bind:clientHeight={height} class="flex items-center">
  {#each links as link, idx}
    <button on:click={() => onNavigate(link.href)}
            class="h-12 [&>svg]:h-4 flex gap-4 items-center ml-4 text-lg underline font-poppins-medium {className}">
      {#if idx === 0}
        <IconLeftArrow />
      {/if}
      <span>{link.name}</span>
    </button>
    {#if idx !== links.length - 1}
      <div class="ml-4 [&>svg]:h-4">
        <IconCarretRight />
      </div>
    {/if}
  {/each}
</div>
