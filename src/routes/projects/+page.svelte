<script lang="ts">
  import { goto } from "$app/navigation";
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { fade, fly } from "svelte/transition";
  import { isMobile } from "../../utils/tailwind-helper";
  import { type Project, projects } from "./projects";
  import ProjectThumbnail from "./ProjectThumnail.svelte";

  let selectedProject: Project | null = projects[0];
  let projectsMobileContainer: HTMLDivElement | null = null; // scroll container for mobile

  let visible = true; // for in/out animation

  // Desktop: parallax effect
  let initialMousePosition: { x: number, y: number } | null = null;
  let projectsThumbnailsTranslate = "";
  let projectDescriptionTranslate = "";
  let bgTranslate = "";

  onMount(() => {
    const mobile = isMobile();
    document.body.style.overflow = mobile ? "scroll" : "hidden";
    if (!mobile) document.body.addEventListener("mousemove", moveBlock);
    if (mobile) scrollToProject(0);
  });

  const onClickProject = (project: Project) => {
    if (isMobile()) {
      const index = projects.indexOf(project);
      console.log(project, index);
      scrollToProject(index);
      return;
    }
    nextProjectToSelect = projects.indexOf(project) ?? 0;
    if (nextProjectToSelect !== projects.indexOf(selectedProject)) selectedProject = null;
  };

  let marginEl: DOMRect;
  let card: DOMRect;

  let nextProjectToSelect = 0;

  const scrollToProject = (index: number) => {
    if (!marginEl || !card) [marginEl, card] = getBlocksDimensions();
    const gap = card.x - marginEl.width;
    const offset = (card.width + gap) - window.innerWidth / 2;
    const scrollDest = offset + index * (card.width + gap);
    console.log("scrollDest", scrollDest);
    console.log("marginEl", marginEl, "card", card);
    projectsMobileContainer?.scrollTo({
      left: scrollDest,
      behavior: "smooth"
    });
  };

  const moveBlock = (e: MouseEvent) => {
    if (!initialMousePosition) initialMousePosition = { x: e.clientX, y: e.clientY };
    const x = (e.clientX - initialMousePosition.x) / 16;
    const y = (e.clientY - initialMousePosition.y) / 10;
    projectsThumbnailsTranslate = `translate(${ x * .9 }px, ${ y * .9 }px)`;
    projectDescriptionTranslate = `translate(${ x * .5 }px, ${ y * .5 }px)`;
    bgTranslate = `translate(${ -x * .3 }px, ${ -y * .3 }px)`;
  };

  const onExitPage = () => {
    document.body.removeEventListener("mousemove", moveBlock);
    goto("/");
  };

  const getBlocksDimensions = (): [DOMRect, DOMRect] => {
    const [marginEl, card] = [...(projectsMobileContainer?.getElementsByTagName("div")) || []].map(it => it.getBoundingClientRect());
    return [marginEl, card];
  };

  // Auto select project on mobile on scroll
  $: if (projectsMobileContainer) {
    const [marginEl, card] = [...(projectsMobileContainer?.getElementsByTagName("div")) || []].map(it => it.getBoundingClientRect());
    const margin = card.x - marginEl.width;
    const cardWith = card.width;
    projectsMobileContainer?.addEventListener("scroll", (e) => {
      const scroll = (e.target as HTMLDivElement).scrollLeft;
      const cardIndex = Math.floor((scroll / (cardWith + 1 / 2 * margin)) + .5);
      selectedProject = projects[cardIndex];
      console.log("scroll", scroll, "cardIndex", cardIndex);
    });
  }

</script>

<AnimationFragment className="md:overflow-y-hidden md:h-screen flex flex-col" visible={visible}>
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
         on:outroend={onExitPage}
         out:fly={{x: 250, duration: 500, delay: 300}}>

      <BgDecoration height="15vh" posBottom="0"
                    posRight="0" rotate="-135deg"
                    translateX="-50%" translateY="-50%"
                    width="15vh" />
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-5 flex-1 md:px-4 relative z-10"
       in:fade={{ duration: 300, delay: 300 }}
       out:fade={{ duration: 300, delay: 0 }}>
    <div bind:this={projectsMobileContainer}
         class="flex flex-row overflow-x-scroll md:flex-col gap-4 items-center snap-x snap-mandatory py-4
                md:py-0 md:gap-8 md:mx-4 md:mx-0 md:justify-center md:mt-4 md:col-span-2"
         style="transform: {projectsThumbnailsTranslate}"
    >
      <div class="snap-center h-[15vh] aspect-[8/9] lg:hidden"></div>
      {#each projects as project}
        <div class="h-[15vh] aspect-video cursor-pointer transition-all duration-300 snap-center
                    {selectedProject === project ? 'md:scale-110 md:translate-x-4 md:hover:animate-project-card-selected-hover' : 'md:opacity-50 md:-translate-x-4 md:hover:animate-project-card-hover'}"
             on:click={() => onClickProject(project)}
             on:keydown={() => onClickProject(project)}>
          <ProjectThumbnail imageLink={project.image} bgColor={project.color} />
        </div>
      {/each}
      <div class="snap-center h-[15vh] aspect-[8/9] md:hidden"></div>
    </div>
    <div class="flex flex-col gap-4 justify-center prose md:col-span-3 p-4"
         style="transform: {projectDescriptionTranslate}">
      {#if selectedProject}
        <div transition:fly={{x: 500, duration: 300}}
             on:outroend={() => selectedProject = projects[nextProjectToSelect]}>
          <h1 class="font-poppins-bold text-6xl mt-4 md:mt-0 mb-0 md:mb-4">{selectedProject.title}</h1>
          <div class="[&>p]:text-lg [&>p]:font-poppins-medium [&_strong]:font-poppins-bold">
            <SvelteMarkdown source={selectedProject.description} />
          </div>
        </div>
      {/if}
    </div>
  </div>
</AnimationFragment>

