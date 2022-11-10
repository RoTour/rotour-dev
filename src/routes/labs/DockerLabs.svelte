<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(() => {
    // create url for
    const url = new URL(`${ $page.url.origin }/error`);
    url.searchParams.set("msg", "Docker labs are coming soon");
    url.searchParams.set("desc", "Stay tuned for more updates !");
    goto(url);
  });
</script>
