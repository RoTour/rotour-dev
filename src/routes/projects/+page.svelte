<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { fade, fly } from 'svelte/transition';

  // Component Imports
  import BgDecoration from '@components/background/BgDecoration.svelte';
  import Back from '@components/navigation/Back.svelte';
  import AnimationFragment from '@components/svelte/AnimationFragment.svelte';
  import Controls from '@components/controls/ControlsStore.svelte';
  import { getDeviceType } from '../../utils/tailwind-helper';
  import ProjectThumbnail from './ProjectThumnail.svelte';
  import { type Project, projects } from './projects';

  // --- STATE ---
  let selectedProject: Project | null = $state(projects[0]);
  let visible = $state(true);
  let projectsThumbnailsTranslate = $state('');
  let projectDescriptionTranslate = $state('');
  let bgTranslate = $state('');
  let preventWiggle = $state(false);
  let placeholderWidth = $state(0);
  let nextProjectIndexToSelect = $state(0);
  let parallaxEnabled = $derived(Controls.isParallaxEnabled);

  // --- REFS ---
  let projectsMobileContainer: HTMLDivElement | null = $state(null);
  let initialMousePosition: { x: number; y: number } | null = null;

  // --- METHODS ---
  const onClickProject = (project: Project) => {
    const onMobile = getDeviceType() !== 'desktop';
    const index = projects.indexOf(project);

    if (onMobile) {
      // [FIX] Directly update the selected project on mobile when a thumbnail is clicked.
      // This ensures the description updates instantly along with the scroll.
      selectedProject = project;
      scrollToProject(index);
      return;
    }

    // Desktop logic
    preventWiggle = true;
    nextProjectIndexToSelect = index;
    // This logic handles the desktop fade-out/fade-in transition by briefly setting the project to null.
    if (selectedProject && nextProjectIndexToSelect !== projects.indexOf(selectedProject)) {
      selectedProject = null;
    }
  };

  /**
   * Scrolls the mobile container to center the project thumbnail at the given index.
   * This uses getBoundingClientRect() for a robust calculation.
   */
  const scrollToProject = (index: number) => {
    if (!projectsMobileContainer) return;

    // The container's children include a leading placeholder div.
    // So, the actual project element is at `index + 1`.
    const targetElement = projectsMobileContainer.children[index + 1] as HTMLElement;
    if (!targetElement) return;

    // Get the exact positions of the container and the target element on the screen.
    const containerRect = projectsMobileContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Calculate the center point of the container and the target.
    const containerCenter = containerRect.left + containerRect.width / 2;
    const targetCenter = targetRect.left + targetRect.width / 2;

    // The distance to scroll is the difference between the centers.
    const scrollOffset = targetCenter - containerCenter;
    
    // Get the current scroll position and add the offset to find the destination.
    const currentScrollLeft = projectsMobileContainer.scrollLeft;

    projectsMobileContainer.scrollTo({
      left: currentScrollLeft + scrollOffset,
      behavior: 'smooth'
    });
  };

  const moveBlock = (e: MouseEvent) => {
    if (!parallaxEnabled) {
      // Reset translations if parallax is disabled
      projectsThumbnailsTranslate = '';
      projectDescriptionTranslate = '';
      bgTranslate = '';
      return;
    }
    if (!initialMousePosition) {
      initialMousePosition = { x: e.clientX, y: e.clientY + window.innerHeight * 0.1 };
    }
    const x = (e.clientX - initialMousePosition.x) / 16;
    const y = (e.clientY - initialMousePosition.y) / 12;
    projectsThumbnailsTranslate = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    projectDescriptionTranslate = `translate(${x * 0.9}px, ${y * 0.9}px)`;
    bgTranslate = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  };

  const onDesktopTransitionEnd = () => {
    if (getDeviceType() === 'desktop') {
      selectedProject = projects[nextProjectIndexToSelect];
    }
  };

  const onExitPage = () => {
    goto('/');
  };

  // --- LIFECYCLE & EFFECTS ---
  onMount(() => {
    const isMobile = getDeviceType() !== 'desktop';

    // This logic calculates the placeholder width to center the first and last items.
    // It needs to run after the DOM is painted, so a short delay can help.
    setTimeout(() => {
        const firstCard = projectsMobileContainer?.children[1] as HTMLElement | undefined;
        if (isMobile && firstCard) {
          const cardRect = firstCard.getBoundingClientRect();
          const containerRect = projectsMobileContainer!.getBoundingClientRect();
          placeholderWidth = containerRect.width / 2 - cardRect.width / 2;
        } else {
            placeholderWidth = 0;
        }

        if (isMobile) {
            // Initially scroll to the first project to ensure it's centered on load
            scrollToProject(0);
        }
    }, 0);
  });


  /**
   * This effect uses IntersectionObserver for efficient detection of which
   * item is in the center after a user scrolls freely.
   */
  $effect(() => {
    const isMobile = getDeviceType() !== 'desktop';

    if (isMobile) {
      if (!projectsMobileContainer) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!projectsMobileContainer) return;
          const intersectingEntry = entries.find((e) => e.isIntersecting);
          if (!intersectingEntry) return;

          const target = intersectingEntry.target;
          const children = Array.from(projectsMobileContainer.children);
          const domIndex = children.indexOf(target);
          
          const projectIndex = domIndex - 1; // account for placeholder

          if (projectIndex >= 0 && projectIndex < projects.length) {
            if(selectedProject?.title !== projects[projectIndex].title) {
                selectedProject = projects[projectIndex];
            }
          }
        },
        {
          root: projectsMobileContainer,
          // This margin creates a 1px vertical line in the horizontal center of the viewport
          // which an item must cross to be considered "intersecting".
          rootMargin: '0px -49.9% 0px -49.9%',
          threshold: 0.5
        }
      );

      const projectElements = Array.from(projectsMobileContainer.children).slice(1, -1);
      projectElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } else {
      document.body.addEventListener('mousemove', moveBlock);
      return () => document.body.removeEventListener('mousemove', moveBlock);
    }
  });
</script>

<!-- TEMPLATE -->
<AnimationFragment className="lg:overflow-y-hidden lg:h-screen flex flex-col" {visible}>
  <div class="relative z-20">
    <Back links={[{ name: 'Back', href: '/' }]} on:navigate={() => (visible = false)} />
  </div>
  <!-- BG Decorations -->
  <div class="absolute top-0 left-0 w-screen h-screen -z-10" style="transform: {bgTranslate}">
    <div
      class="block absolute top-1/2 left-0"
      in:fly={{ x: -250, duration: 500 }}
      out:fly={{ x: -250, duration: 500, delay: 300 }}
    >
      <BgDecoration
        height="100vh"
        posLeft="0"
        posTop="50%"
        rotate="45deg"
        translateX="-55%"
        translateY="-50%"
        width="100vh"
      />
    </div>
    <div
      class="block absolute bottom-0 right-0"
      in:fly={{ x: 250, duration: 500 }}
      onoutroend={onExitPage}
      out:fly={{ x: 250, duration: 500, delay: 300 }}
    >
      <BgDecoration
        height="15vh"
        posBottom="0"
        posRight="0"
        rotate="-135deg"
        translateX="-50%"
        translateY="-50%"
        width="15vh"
      />
    </div>
  </div>

  <div
    class="grid grid-cols-1 lg:grid-cols-5 flex-1 lg:px-4 relative z-10 mt-12 lg:min-h-0"
    in:fade={{ duration: 300, delay: 300 }}
    out:fade={{ duration: 300, delay: 0 }}
  >
    <div
      bind:this={projectsMobileContainer}
      class="flex flex-row overflow-x-scroll lg:overflow-x-visible lg:flex-col gap-4 items-center snap-x snap-mandatory py-4
                lg:py-0 lg:gap-8 lg:mx-0 lg:justify-center lg:mt-4 lg:col-span-2"
      style="transform: {projectsThumbnailsTranslate}"
    >
      <!-- This placeholder helps center the first item. 'snap-center' is removed. -->
      <div class="h-[15vh] lg:hidden" style="min-width: {placeholderWidth}px; flex-shrink: 0;"></div>
      {#each projects as project, i (project.title)}
        <button
          class="h-[15vh] aspect-video cursor-pointer transition-all duration-300 snap-center
                    {selectedProject?.title === project.title
            ? `lg:scale-110 lg:translate-x-4 ${!preventWiggle && 'lg:hover:animate-project-card-selected-hover'}`
            : 'lg:opacity-50 lg:-translate-x-4 lg:duration-200 lg:hover:translate-x-0'}"
          style="flex-shrink: 0;"
          onmouseleave={() => (preventWiggle = false)}
          onclick={() => onClickProject(project)}
          onkeydown={() => onClickProject(project)}
        >
          <ProjectThumbnail imageLink={project.image} bgColor={project.color} />
        </button>
      {/each}
       <!-- This placeholder helps center the last item. 'snap-center' is removed. -->
      <div class="h-[15vh] lg:hidden" style="min-width: {placeholderWidth}px; flex-shrink: 0;"></div>
    </div>
    <div
      class="flex flex-col gap-4 prose lg:col-span-3 p-4 overflow-y-auto"
      style="transform: {projectDescriptionTranslate}"
    >
      {#if selectedProject}
        <div
          class="min-h-0"
          transition:fly|local={{ x: 500, duration: 300 }}
          onoutroend={onDesktopTransitionEnd}
        >
          <h1 class="font-poppins-bold text-3xl lg:text-5xl mt-4 lg:mt-0 mb-0 lg:mb-4">
            {selectedProject.title}
          </h1>
          <div
            class="[&>p]:text-md [&>p]:font-poppins-medium [&_strong]:font-poppins-bold text-justify"
          >
            <SvelteMarkdown source={selectedProject.description} />
          </div>

          {#if selectedProject.descriptionImages && selectedProject.descriptionImages.length > 0}
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              {#each selectedProject.descriptionImages as imgUrl}
                <a href={imgUrl} target="_blank" rel="noreferrer">
                  <img
                    src={imgUrl}
                    alt="{selectedProject.title} screenshot"
                    class="rounded-lg shadow-lg w-full object-cover aspect-video"
                  />
                </a>
              {/each}
            </div>
          {/if}

          {#if selectedProject.link}
            <a
              class="block mt-6 font-poppins-bold text-secondary not-prose no-underline"
              href={selectedProject.link}
              rel="noreferrer"
              target="_blank"
            >
              Visit website
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</AnimationFragment>
