import type { SvelteComponent } from 'svelte';

export type Skill = {
	name: string;
	style?: string;
	classes?: string;

	icon: SvelteComponent;
};
