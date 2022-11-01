<script lang="ts">
	import { getCurrentBreakPoint } from '../../utils/tailwind-helper';

	export let name = '';
	export let expanded = false;
	let bgClass;


  const getExpandedClass = () => {
		if (!expanded) return '';
		const currentBreakpoint = getCurrentBreakPoint()[1]
		console.log('currentBreakpoint', currentBreakpoint);
    if (currentBreakpoint === 'sm') return 'width: 100vw;'
    return 'width: calc(100% + 6rem);'
  }

	$: bgClass = getExpandedClass()

</script>

<!--HitBox-->
<div class="[&_h2]:hover:opacity-100 md:[&_h2]:hover:ml-12
            [&_span]:hover:w-screen md:[&_span]:hover:w-[calc(100%_+_6rem)] [&>div]:hover:bg-gray-100
            py-4 cursor-pointer {expanded && 'pointer-events-none'}">
  <div class="w-full">
    <h2 class="transition-all duration-300 p-4 md:pl-16 relative w-fit {expanded && 'opacity-100 md:ml-12'}">
    <span class="absolute top-0 -left-1 md:-left-20 w-0 transition-all duration-300
                 h-full bg-gradient-to-r from-secondary via-primary to-primary z-10 block
                 {expanded && 'w-screen'}"
          style="{bgClass}"
    ></span>
      <span class="z-20 relative">{name}</span>
    </h2>
  </div>
</div>
