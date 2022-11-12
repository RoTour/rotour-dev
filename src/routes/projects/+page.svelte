<script lang="ts">
  import { goto } from "$app/navigation";
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { fade, fly } from "svelte/transition";
  import { getCurrentBreakPoint } from "../../utils/tailwind-helper";
  import { type Project, projects } from "./projects";
  import ProjectThumbnail from "./ProjectThumnail.svelte";

  let selectedProject: Project | null = projects[0];
  let breadCrumbContainer: HTMLDivElement | null = null;
  let projectsMobileContainer: HTMLDivElement | null = null;

  let visible = true;

  onMount(() => {
    const breakPoint = getCurrentBreakPoint()[1];
    if (breakPoint === "sm" || breakPoint === "md") return;
    document.body.style.overflow = "hidden";
    console.log("projectsMobileContainer", projectsMobileContainer);
  });

  const onClickProject = (project: Project) => {
    const breakPoint = getCurrentBreakPoint()[1];
    if (breakPoint === "sm" || breakPoint === "md") {
      projectsMobileContainer?.scrollTo({
        left: projects.indexOf(project) * 198,
        behavior: "smooth"
      });
      return;
    }
    selectedProject = project;
  };

  $: if (projectsMobileContainer) {
    const [marginEl, card] = [...(projectsMobileContainer?.getElementsByTagName("div")) || []].map(it => it.getBoundingClientRect());
    const margin = card.x - marginEl.width;
    const cardWith = card.width;
    projectsMobileContainer?.addEventListener("scroll", (e) => {
      const scroll = (e.target as HTMLDivElement).scrollLeft;
      const cardIndex = Math.floor((scroll / (cardWith + 1 / 2 * margin)) + .5);
      selectedProject = projects[cardIndex];
    });
  }
</script>

<AnimationFragment className="lg:overflow-y-hidden lg:h-screen flex flex-col" visible={visible}>
  <div bind:this={breadCrumbContainer}>
    <Back links={[{name: 'Back', href: '/'}]} on:navigate={() => (visible = false)} />
  </div>
  <!-- BG Decorations -->
  <div class="absolute top-0 left-0 w-screen h-screen -z-10">
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
         on:outroend={() => goto('/')}
         out:fly={{x: 250, duration: 500, delay: 300}}>
      >
      <BgDecoration height="15vh" posBottom="0"
                    posRight="0" rotate="-135deg"
                    translateX="-50%" translateY="-50%"
                    width="15vh" />
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-5 flex-1 md:px-4"
       in:fade={{ duration: 300, delay: 300 }}
       out:fade={{ duration: 300, delay: 0 }}>
    <div bind:this={projectsMobileContainer}
         class="flex flex-row overflow-x-scroll lg:flex-col gap-4 items-center snap-x snap-mandatory py-4
                lg:py-0 lg:gap-8 lg:mx-4 lg:mx-0 lg:justify-center lg:col-span-2"
    >
      <div class="snap-center h-[15vh] aspect-[8/9]"></div>
      {#each projects as project}
        <div class="h-[15vh] aspect-video cursor-pointer transition-all duration-300 snap-center
                    {selectedProject === project ? 'lg:scale-110 lg:translate-x-4' : 'lg:opacity-50 lg:-translate-x-4'}
             "
             on:click={() => onClickProject(project)}
             on:keydown={() => onClickProject(project)}>
          <ProjectThumbnail imageLink={project.image} bgColor={project.color} />
        </div>
      {/each}
      <div class="snap-center h-[15vh] aspect-[8/9]"></div>
    </div>
    <div class="flex flex-col gap-4 justify-center prose lg:col-span-3 p-4">
      {#if selectedProject}
        <h1 class="font-poppins-bold text-6xl mb-4">{selectedProject.title}</h1>
        <div class="[&>p]:text-lg [&>p]:font-poppins-medium [&_strong]:font-poppins-bold">
          <SvelteMarkdown source={selectedProject.description} />
        </div>
      {/if}
    </div>
  </div>
</AnimationFragment>

