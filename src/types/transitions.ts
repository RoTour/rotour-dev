import type { TransitionConfig } from 'svelte/types/runtime/transition';

export type Transition = (node: HTMLElement, options: { delay: number, duration: number }) => TransitionConfig