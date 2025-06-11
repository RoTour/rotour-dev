<script lang="ts">
  import { goto } from '$app/navigation';
  import { cubicOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  // --- Component Imports ---
  import AnimationFragment from '@components/svelte/AnimationFragment.svelte';
  import Back from '@components/navigation/Back.svelte';
  import BgDecoration from '@components/background/BgDecoration.svelte';
  import Controls from '@components/controls/ControlsStore.svelte';

  // --- Svelte 5 State ---
  let visible = $state(false);
  let destination = $state('');
  let navBarHeight = $state(0);
  let initialMousePosition = $state<{ x: number; y: number } | null>(null);
  let mainBlockTranslate = $state('');
  let bgTranslate = $state('');
  let parallaxEnabled = $derived(Controls.isParallaxEnabled);

  const aboutMeText = `I'm a 24-year-old developer with a passion for creating beautiful, high-performance web experiences. My journey into code started with a curiosity for how things work, and it has evolved into a career focused on building intuitive and efficient applications.`;

  // --- Lifecycle & Effects with Svelte 5 ---
  $effect(() => {
    visible = true;
    const handleMouseMove = (e: MouseEvent) => moveBlock(e);
    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  });

  // --- Methods ---
  const onBackPressed = (e: { detail: string }) => {
    destination = e.detail;
    visible = false;
  };

  const onOutroEnd = () => {
    if (destination) {
      goto(destination);
    }
  };

  const moveBlock = (e: MouseEvent) => {
    if (!parallaxEnabled) return;
    if (!initialMousePosition) {
      initialMousePosition = { x: e.clientX, y: e.clientY + window.innerHeight * 0.1 };
    }
    const x = (e.clientX - initialMousePosition.x) / 20;
    const y = (e.clientY - initialMousePosition.y) / 15;
    mainBlockTranslate = `translate(${x * 0.7}px, ${y * 0.7}px)`;
    bgTranslate = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  };
</script>

<AnimationFragment {visible}>
  <!-- Background Decorations -->
  <div
    class="absolute h-screen w-screen top-0 left-0 -z-10"
    style="transform: {bgTranslate}"
    in:fly={{ duration: 1000, x: -1000, easing: cubicOut }}
    out:fly={{ duration: 1000, x: -1000, easing: cubicOut }}
    onoutroend={onOutroEnd}
  >
    <BgDecoration height="40vw" posTop="50%" rotate="-60deg" translateY="-50%" width="40vw" />
  </div>
  <div
    class="absolute h-screen w-screen top-0 left-0 -z-10"
    in:fly={{ duration: 1000, x: 1000, easing: cubicOut }}
    out:fly={{ duration: 1000, x: 1000, easing: cubicOut }}
  >
    <BgDecoration height="20vw" posBottom="0" posRight="0" rotate="120deg" translateY="0%" width="20vw" />
  </div>

  <!-- Back Navigation -->
  <Back bind:height={navBarHeight} links={[{ name: 'Back', href: '/' }]} on:navigate={onBackPressed} />

  <!-- Main Content Grid -->
  <div
    class="w-full max-w-7xl mx-auto flex flex-col justify-center lg:h-screen lg:py-24 px-4"
    style="padding-top: {navBarHeight}px;"
    out:fade={{ duration: 800, delay: 200, easing: cubicOut }}
  >
    <div
      class="w-full flex-grow lg:grid lg:grid-cols-5 lg:gap-16 xl:gap-24 lg:items-center"
      style="transform: {mainBlockTranslate}"
    >
      <!-- Left Column: Image -->
      <div class="lg:col-span-2 flex justify-center" in:fade={{ duration: 800, delay: 200, easing: cubicOut }}>
        <img
          src="/images/pp-linkedin.webp"
          alt="A portrait"
          class="rounded-lg shadow-2xl object-cover w-3/4 lg:w-full max-w-sm aspect-[1/1] lg:aspect-[4/5] mt-16 lg:mt-0"
          onerror={(e: Event) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/500x600/1a1a1a/ffffff?text=Image+Not+Found'
          }}
        />
      </div>

      <!-- Right Column: All Text Content -->
      <div
        class="lg:col-span-3 mt-12 lg:mt-0"
        in:fly={{ x: 100, duration: 800, delay: 400, easing: cubicOut }}
      >
        <div class="flex flex-col gap-y-8">
          <div>
            <h1 class="text-4xl lg:text-5xl font-poppins-bold mb-4">Who am I?</h1>
            <p class="prose font-poppins-medium text-base lg:text-lg text-justify max-w-prose">
              {aboutMeText}
            </p>
          </div>

          <hr class="border-gray-200 dark:border-gray-700" />

          <div class="flex flex-col gap-y-8">
            <div>
              <h3 class="font-poppins-bold text-xl mb-2">My Approach to Building for the Web</h3>
              <p class="text-gray-600 dark:text-gray-300 max-w-prose">
                I believe in pragmatic solutions and clean code. My goal is always to build products
                that are not just functional, but also a joy to use, maintain, and scale.
              </p>
            </div>
            <div>
              <h3 class="font-poppins-bold text-xl mb-2">Why I Choose Svelte</h3>
              <p class="text-gray-600 dark:text-gray-300 max-w-prose">
                While proficient in React, I choose Svelte for its remarkable development speed. It
                allows me to build and ship the same rich, interactive features much faster, thanks
                to its minimal boilerplate and truly reactive nature. This means less time wrestling
                with the framework and more time delivering value.
              </p>
            </div>
          </div>

          <!-- Blog Call to Action -->
          <div class="mt-4">
            <a
              href="https://raltech.school/blog"
              class="group inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all duration-300 rounded-lg px-6 py-4 text-lg font-poppins-bold no-underline mb-8 lg:mb-0"
            >
              <span>Read My Blog</span>
              <span class="transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right"
                  ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
                >
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</AnimationFragment>

<style>
  .prose {
    max-width: 65ch;
  }
</style>
