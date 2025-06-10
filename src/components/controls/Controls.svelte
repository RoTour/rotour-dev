<script lang="ts">
	import { Trees } from 'lucide-svelte';
	import controlsStore from './ControlsStore.svelte.ts';
	import Button, { buttonVariants } from '$lib/shadcn/ui/button/button.svelte';
	import * as Tooltip from '$lib/shadcn/ui/tooltip';
	import { cn } from '$lib/utils.ts';
</script>

<aside class="fixed top-0 right-0 m-4 z-40">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger
				class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full border-2 border-black')}
				onclick={() => controlsStore.toggleParallax()}
			>
				<Trees size={24} />
        {#if !controlsStore.isParallaxEnabled}
          <div class="bg-black h-[2px] w-full -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
        {/if}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{controlsStore.isParallaxEnabled ? 'Disable' : 'Enable'} moving effect</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</aside>
