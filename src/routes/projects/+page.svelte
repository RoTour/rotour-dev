<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { fade, fly } from "svelte/transition";
  
  // Assuming these are your components, no change needed
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import { getDeviceType } from "../../utils/tailwind-helper";
  import { type Project, projects } from "./projects";
  import ProjectThumbnail from "./ProjectThumnail.svelte";
  import Controls from "@components/controls/ControlsStore.svelte";

  let selectedProject: Project | null = $state(projects[0]);
  let visible = $state(true);
  let projectsThumbnailsTranslate = $state("");
  let projectDescriptionTranslate = $state("");
  let bgTranslate = $state("");
  let preventWiggle = $state(false);
  let placeholderWidth = $state(0);
  let nextProjectIndexToSelect = $state(0);
  let parallaxEnabled = $derived(Controls.isParallaxEnabled)
  
  let projectsMobileContainer: HTMLDivElement | null = null;
  let initialMousePosition: { x: number, y: number } | null = null;
  
  
  // --- METHODS ---
  // Functions that modify state are largely the same
  const onClickProject = (project: Project) => {
    const onMobile = getDeviceType() !== "desktop";
    if (onMobile) {
      const index = projects.indexOf(project);
      scrollToProject(index);
      return;
    }
    preventWiggle = true;
    nextProjectIndexToSelect = projects.indexOf(project) ?? 0;
    // The transition will handle updating the selected project
    if (selectedProject && nextProjectIndexToSelect !== projects.indexOf(selectedProject)) {
      selectedProject = null;
    }
  };

  const getBlocksDimensions = (): [DOMRect, DOMRect] | [null, null] => {
      if (!projectsMobileContainer) return [null, null];
      const [marginEl, card] = [...projectsMobileContainer.getElementsByTagName("div")].map(it => it.getBoundingClientRect());
      return [marginEl, card];
  };

  const scrollToProject = (index: number) => {
    const [marginEl, card] = getBlocksDimensions();
    if (!marginEl || !card || !projectsMobileContainer) return;

    const gap = card.x - marginEl.width;
    const offset = (card.width + gap) - window.innerWidth / 2;
    const scrollDest = offset + index * (card.width + gap);
    
    projectsMobileContainer.scrollTo({
      left: scrollDest,
      behavior: "smooth"
    });
  };

  const moveBlock = (e: MouseEvent) => {
    if (!parallaxEnabled) return;
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
    if (getDeviceType() === "desktop") {
      selectedProject = projects[nextProjectIndexToSelect];
    }
  };

  const onExitPage = () => {
    // The cleanup function from the $effect will remove the listener
    goto("/");
  };

  $inspect("Selected project", selectedProject);

  // --- LIFECYCLE & EFFECTS ---
  onMount(() => {
    const isMobile = getDeviceType() !== 'desktop';
    document.body.style.overflow = isMobile ? 'scroll' : 'hidden';
    document.body.style.overflowX = isMobile ? 'scroll' : 'hidden';

    if (isMobile) {
      scrollToProject(0);
    }

    const [marginEl, card] = getBlocksDimensions();
    if (card && marginEl) {
        placeholderWidth = document.body.clientWidth / 2 - card.width / 2 - (card.x - marginEl.width);
    }

    // Cleanup function for onMount
    return () => {
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'auto';
    };
  });
  
  // Use $effect for side effects that depend on state or props
  $effect(() => {
    // This effect runs whenever `projectsMobileContainer` changes.
    // We check if it's not null before adding the listener.
    if (projectsMobileContainer) {
      const isMobile = getDeviceType() !== 'desktop';
      
      const handleScroll = (e: Event) => {
        const [marginEl, card] = getBlocksDimensions();
        if (!card || !marginEl) return;
        const margin = card.x - marginEl.width;
        const cardWidth = card.width;
        const scroll = (e.target as HTMLDivElement).scrollLeft;
        const cardIndex = Math.round(scroll / (cardWidth + margin));
        selectedProject = projects[cardIndex];
      };

      if (isMobile) {
        projectsMobileContainer.addEventListener("scroll", handleScroll);
      } else {
        document.body.addEventListener("mousemove", moveBlock);
      }
      
      // The return function is a *cleanup* function.
      // Svelte runs it before re-running the effect or when the component is destroyed.
      return () => {
        if (isMobile) {
            projectsMobileContainer?.removeEventListener("scroll", handleScroll);
        } else {
            document.body.removeEventListener("mousemove", moveBlock);
        }
      };
    }
  });

</script>

<!-- The template (HTML) part remains exactly the same -->
<AnimationFragment className="lg:overflow-y-hidden lg:h-screen flex flex-col" visible={visible}>
  <div class="relative z-20">
    <Back links={[{name: 'Back', href: '/'}]} on:navigate={() => (visible = false)} />
  </div>
  <!-- BG Decorations -->
  <div class="absolute top-0 left-0 w-screen h-screen -z-10" style="transform: {bgTranslate}">
    <div class="block absolute top-1/2 left-0"
         in:fly={{x: -250, duration: 500}}
         out:fly={{x: -250, duration: 500, delay: 300}}>
      <BgDecoration height="100vh" posLeft="0"
                    posTop="50%" rotate="45deg"
                    translateX="-55%" translateY="-50%"
                    width="100vh" />
    </div>
    <div class="block absolute bottom-0 right-0"
         in:fly={{x: 250, duration: 500}}
         onoutroend={onExitPage}
         out:fly={{x: 250, duration: 500, delay: 300}}>

      <BgDecoration height="15vh" posBottom="0"
                    posRight="0" rotate="-135deg"
                    translateX="-50%" translateY="-50%"
                    width="15vh" />
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-5 flex-1 lg:px-4 relative z-10 mt-12"
       in:fade={{ duration: 300, delay: 300 }}
       out:fade={{ duration: 300, delay: 0 }}>
    <div bind:this={projectsMobileContainer}
         class="flex flex-row overflow-x-scroll lg:overflow-x-auto lg:flex-col gap-4 items-center snap-x snap-mandatory py-4
                lg:py-0 lg:gap-8 lg:mx-0 lg:justify-center lg:mt-4 lg:col-span-2"
         style="transform: {projectsThumbnailsTranslate}"
    >
      <div class="snap-center h-[15vh] lg:hidden" style="min-width: {placeholderWidth}px"></div>
      {#each projects as project}
        <div class="h-[15vh] aspect-video cursor-pointer transition-all duration-300 snap-center
                    {selectedProject?.title === project.title ? `lg:scale-110 lg:translate-x-4 ${!preventWiggle && 'lg:hover:animate-project-card-selected-hover'}` : 'lg:opacity-50 lg:-translate-x-4 lg:duration-200 lg:hover:translate-x-0'}"
             onmouseleave={() => (preventWiggle = false)}
             onclick={() => onClickProject(project)}
             onkeydown={() => onClickProject(project)}>
          <ProjectThumbnail imageLink={project.image} bgColor={project.color} />
        </div>
      {/each}
      <div class="snap-center h-[15vh] lg:hidden" style="min-width: {placeholderWidth}px"></div>
    </div>
    <div class="flex flex-col gap-4 justify-center prose lg:col-span-3 p-4"
         style="transform: {projectDescriptionTranslate}">
      {#if selectedProject}
        <div transition:fly={{x: 500, duration: 300}}
             onoutroend={onDesktopTransitionEnd}>
          <h1 class="font-poppins-bold text-5xl mt-4 lg:mt-0 mb-0 lg:mb-4">{selectedProject.title}</h1>
          <div class="[&>p]:text-md [&>p]:font-poppins-medium [&_strong]:font-poppins-bold text-justify">
            <SvelteMarkdown source={selectedProject.description} />
          </div>
          {#if selectedProject.link}
            <a class="font-poppins-bold text-secondary" href={selectedProject.link} rel="noreferrer" target="_blank">Visit
              website</a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</AnimationFragment>
