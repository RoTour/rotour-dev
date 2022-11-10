<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  export let content = "";

</script>

<div class="p-4 lg:mt-8 w-screen relative z-10 lg:w-3/4 mx-auto">
  <div
    class="prose bg-white lg:p-4 rounded-xl lg:border lg:border-black lg:border-solid lg:border-2 max-w-full lg:drop-shadow-2xl [&_img]:m-auto">
    <SvelteMarkdown source={content} />
  </div>
</div>
