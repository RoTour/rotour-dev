<script lang="ts">
	import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@rgossiaux/svelte-headlessui';
	import IconCaretDown from '@components/icons/IconCaretDown.svelte';
	import { createEventDispatcher } from 'svelte';

	type ListBoxItem = { label: string, value: never };
	export let items: ListBoxItem[] = [];
	export let selected: ListBoxItem | undefined;
	export let label: keyof ListBoxItem = 'label';

	const dispatch = createEventDispatcher();

	$: dispatch('change', selected || null);

</script>

<Listbox class="relative" on:change={(e) => (selected = e.detail)} value={selected}>
  <ListboxButton class="w-full">
    <div class="flex flex-row items-center justify-between">
      {selected?.[label] ?? 'Select an item'}
      <span class="ml-2 h-6 [&>svg]:fill-black [&>svg]:h-full"><IconCaretDown/></span>
    </div>
  </ListboxButton>
  <ListboxOptions class="bg-white border border-black border-2 shadow shadow-lg mt-2 w-[calc(100%+2rem+2px)] rounded-xl border border-black z-10
                         absolute left-[50%] translate-x-[-50%]">
    {#if items.length > 0}
      {#each items as item}
        <ListboxOption value={item} class="hover:bg-primary px-4 py-2 md:py-1 rounded-xl cursor-pointer">
          {item[label]}
        </ListboxOption>
      {/each}
    {:else}
      <ListboxOption value={null} disabled class="px-4">
        No items
      </ListboxOption>
    {/if}
  </ListboxOptions>
</Listbox>
