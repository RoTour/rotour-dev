<script lang="ts">
  import { notification } from "$lib/notification.store";
  import { onMount } from "svelte";
  import { elasticOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import "../styles/fonts.css";
  import "../styles/index.css";

  onMount(() => {
    notification.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          notification.set(null);
        }, 5000);
      }
    });
  });
</script>
{#if $notification}
  <div class="p-4">
    <div in:fly={{ y: 100, easing: elasticOut, duration: 1000 }}
         out:fly={{ y: -100, easing: elasticOut, duration: 1000 }}
         class="absolute w-[calc(100%-2rem)] md:w-2/3 lg:w-1/2 top-0 left-1/2 -translate-x-1/2 border-black rounded-lg border-2 bg-white px-4 py-8 mt-4">
      <div class="{$notification.type === 'error' ? 'text-red-500' : 'text-primary'}
                 font-poppins-bold text-md md:text-2xl"
      >
        {$notification.message}
      </div>
    </div>
  </div>
{/if}
<slot />
