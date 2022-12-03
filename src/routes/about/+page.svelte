<script lang="ts">
  import { goto } from "$app/navigation";
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import IconCSS from "@components/icons/logos/IconCSS.svelte";
  import IconDocker from "@components/icons/logos/IconDocker.svelte";
  import IconDrone from "@components/icons/logos/IconDrone.svelte";
  import IconKubernetes2 from "@components/icons/logos/IconKubernetes2.svelte";
  import IconNodejs4 from "@components/icons/logos/IconNodejs4.svelte";
  import IconPostgres from "@components/icons/logos/IconPostgres.svelte";
  import IconReact from "@components/icons/logos/IconReact.svelte";
  import IconSvelte from "@components/icons/logos/IconSvelte.svelte";
  import IconTailwind from "@components/icons/logos/IconTailwind.svelte";
  import IconTypescript from "@components/icons/logos/IconTypescript.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import type { Skill } from "@types/skill";
  import { onMount } from "svelte";
  import { cubicOut, elasticOut } from "svelte/easing";
  import { fade, fly, scale } from "svelte/transition";
  import AboutMeData from "./data.ts";
  import MobileSkills from "./MobileSkills.svelte";
  import SkillElement from "./Skill.svelte";

  let navBarHeight = 0;
  let visible = false;
  let destination = "";

  const formatTxt = (text: string) => {
    return text.replace(/\n/g, "<br/><br/>");
  };

  // place randomly on the screen
  // NodeJS Typescript SQL Svelte Tailwind ReactJS Docker git DroneCI Kubernetes CSS
  const skills: Skill[] = [
    { name: "ReactJS", classes: "top-1/2 left-1/2 text-5xl", icon: IconReact },
    { name: "Svelte", classes: "top-1/2 right-0 -translate-y-[200%] text-3xl", icon: IconSvelte },
    {
      name: "Tailwind",
      classes: "top-[18%] right-[10%] -translate-x-1/2 translate-y-full text-2xl",
      icon: IconTailwind
    },
    { name: "CSS", classes: "bottom-[10%] right-0 -translate-x-full text-2xl", icon: IconCSS },
    { name: "Typescript", classes: "top-[15%] left-0 -translate-x-[10%] text-4xl", icon: IconTypescript },
    { name: "NodeJS", classes: "top-0 left-1/2 -translate-x-1/2 text-5xl", icon: IconNodejs4 },
    { name: "SQL", classes: "right-0 top-[10%] -translate-x-1/2 text-3xl", icon: IconPostgres },
    { name: "Kubernetes", classes: "bottom-[20%] left-[5%] text-4xl", icon: IconKubernetes2 },
    { name: "DroneCI", classes: "bottom-[50%] right-1/2 -translate-x-1/2 text-3xl", icon: IconDrone },
    { name: "Docker", classes: "bottom-0 left-1/2 -translate-x-1/2 text-5xl", icon: IconDocker }
  ];

  onMount(() => {
    visible = true;
  });

  const onBackPressed = (e: { detail: string }) => {
    destination = e.detail;
    visible = false;
    console.log("onBackPressed", e.detail, visible);
  };
</script>

<AnimationFragment visible={visible}>
  <div class="absolute h-screen -z-10" transition:fly={{duration: 1000, x: -1000, easing: cubicOut}}>
    <BgDecoration height="40vw" posTop="50%" rotate="-60deg" translateY="-50%" width="40vw" />
  </div>
  <Back bind:height={navBarHeight} links={[{name: "Back", href: "/" }]} on:navigate={onBackPressed} />
  <div class="w-full lg:p-0 lg:w-4/5 mx-auto flex flex-col justify-evenly items-center lg:h-screen lg:py-12"
       style="margin-top: {navBarHeight}">
    <div class="flex flex-col mt-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:min-h-[60%] w-full">
      <div class="self-center" transition:fade={{duration: 1000, easing: cubicOut}}>
        <h2 class="text-4xl lg:text-5xl font-poppins-bold mb-2 p-4">Who am I ?</h2>
        <p class="prose font-poppins-medium text-sm lg:text-lg p-4">{@html formatTxt(AboutMeData.aboutMeTxt)}</p>
      </div>
      <div>
        <ul class="h-full w-full relative hidden lg:block">
          {#each skills as skill}
            <li transition:scale={{easing: elasticOut, delay: Math.floor(Math.random() * 1000) + 250, duration: 1000}}
                on:outroend={() => goto(destination)}
                class="absolute {skill.classes}">
              <SkillElement skill={skill} />
            </li>
          {/each}
        </ul>
        <div class="block lg:hidden" transition:fade={{duration: 1000, easing: cubicOut}}>
          <MobileSkills skills={skills} />
        </div>
      </div>
    </div>
  </div>
</AnimationFragment>
