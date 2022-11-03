import type { TransitionOptions } from './transition-options';
import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';


export const fadeAndScale = (
	_: HTMLElement,
	{
		duration = 1000,
		delay = 0,
		inverted = false,
		maxScale = 2,
	}: TransitionOptions & { inverted?: boolean, maxScale?: number },
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
				scale = (maxScale - 1) * eased;
			}
			return `
				opacity: ${eased};
				transform: scale(${scale});
			`;
		},
	};
};