import { writable } from 'svelte/store';

export type Notification = {
	type: 'success' | 'error';
	message: string;
};

export const notification = writable<Notification | null>(null);
