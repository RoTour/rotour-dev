<script lang="ts">
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import { fly } from "svelte/transition";
</script>

<div in:fly={{duration: 800, y: 300}} out:fly={{duration: 800, y: 300}}
     class="block fixed left-0 bottom-0">
  <BgDecoration height="40vh" posBottom="0" posLeft="0" rotate="-45deg" translateY="55%" width="40vh" />
</div>
<div in:fly={{duration: 800, y: -300}} out:fly={{duration: 800, y: -300}}
     class="block fixed top-0 right-0">
  <BgDecoration height="30vh" posRight="0" posTop="0" rotate="135deg" translateY="-95%" width="30vh" />
</div>

<slot/>