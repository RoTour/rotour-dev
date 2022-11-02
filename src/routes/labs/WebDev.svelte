<script lang="ts">
	import { onMount } from 'svelte';
	import LabCard from './LabCard.svelte';

	let file;

	onMount(async () => {
		document.body.style.overflowX = 'hidden';
		document.body.style.overflowY = 'unset';
		fetch('/webdev/part1-html-css/readme.md').then(res => res.text()).then((data: string) => {
			file = data.replace(/!\[]\(/g, '![](/webdev/part1-html-css/');
		});
	});
</script>

<LabCard content={file}/>