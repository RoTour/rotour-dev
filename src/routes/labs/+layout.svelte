<script lang="ts">
	import { fly } from 'svelte/transition';
	import BgDecoration from '@components/background/BgDecoration.svelte';
</script>

<div in:fly={{duration: 800, y: 300}} out:fly={{duration: 800, y: 300}}
     class="block absolute left-0 bottom-0">
  <BgDecoration width="30vw" height="30vw" posBottom="0" posLeft="0" rotate="-45deg" translateY="55%"/>
</div>
<div in:fly={{duration: 800, y: -300}} out:fly={{duration: 800, y: -300}}
     class="block absolute top-0 right-0">
  <BgDecoration width="20vw" height="20vw" posTop="0" posRight="0" rotate="135deg" translateY="-95%"/>
</div>

<slot/>