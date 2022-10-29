import type { TransitionOptions } from './transition-options';
import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';


export const fadeAndScale = (
	node: HTMLElement,
	{
		duration = 1000,
		delay = 0,
		inverted = false,
		maxScale,
	}: TransitionOptions & { inverted: boolean, maxScale: number },
): TransitionConfig => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			let scale: number;
			if (inverted) {
				//from 1 to maxScale
				scale = maxScale - (maxScale - 1) * eased;
			} else {
				//from maxScale to 1
				scale = 1 + (maxScale - 1) * eased;
			}
			// from 1 to maxScale
			return `
				opacity: ${ eased };
				transform: scale(${ scale });
			`;
		},
	};
};