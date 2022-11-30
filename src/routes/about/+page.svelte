<script lang="ts">
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import Back from "@components/navigation/Back.svelte";
  import type { Skill } from "@types/skill";
  import { onMount } from "svelte";
  import { isMobile } from "../../utils/tailwind-helper";
  import AboutMeData from "./data.ts";
  import SkillElement from "./Skill.svelte";

  let profilePictureRotation = -45;
  let bgRef: HTMLDivElement | null = null;

  onMount(() => {
    if (!isMobile()) {
      setInterval(() => {
        profilePictureRotation += .1;
        if (bgRef) {
          const left = bgRef.style.left.replace("%", "");
          bgRef.style.left = `${ +left - 0.1 }%`;
        }
      }, 10);
      if (bgRef) {
        console.log(bgRef.style.left);
      }
    }
    console.log("mounted");
  });

  const formatTxt = (text: string) => {
    return text.replace(/\n/g, "<br/><br/>");
  };

  // place randomly on the screen
  // NodeJS Typescript SQL Svelte Tailwind ReactJS Docker git DroneCI Kubernetes CSS
  const skills: Skill[] = [
    { name: "NodeJS", classes: "top-0 left-1/2 -translate-x-1/2 text-5xl" },
    { name: "SQL", classes: "right-0 top-[10%] -translate-x-1/2 text-3xl" },
    { name: "Typescript", classes: "top-[15%] left-0 -translate-x-[10%] text-4xl" },
    { name: "Tailwind", classes: "top-[18%] right-[10%] -translate-x-1/2 translate-y-full text-2xl" },
    { name: "Svelte", classes: "top-1/2 right-0 -translate-y-[200%] text-3xl" },
    { name: "ReactJS", classes: "top-1/2 left-1/2 text-5xl" },
    { name: "Kubernetes", classes: "bottom-[20%] left-[5%] text-4xl" },
    { name: "CSS", classes: "bottom-[10%] right-0 -translate-x-full text-2xl" },
    { name: "DroneCI", classes: "bottom-[50%] right-1/2 -translate-x-1/2 text-3xl" },
    { name: "Docker", classes: "bottom-0 left-1/2 -translate-x-1/2 text-5xl" }
  ];

</script>

<BgDecoration height="40vw" posTop="50%" rotate="-60deg" translateY="-50%" width="40vw" />
<Back className="fixed top-0 left-0" links={[{name: "Back", href: "/" }]} />
<div class="w-full p-4 lg:p-0 lg:w-4/5 mx-auto flex flex-col justify-evenly items-center md:h-screen md:py-12">
  <div class="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:min-h-[60%]">
    <div class="self-center">
      <h2 class="text-6xl font-poppins-bold mb-2">Who am I ?</h2>
      <p class="prose font-poppins-medium text-lg">{@html formatTxt(AboutMeData.aboutMeTxt)}</p>
    </div>
    <div>
      <ul class="h-full w-full relative">
        {#each skills as skill}
          <SkillElement skill={skill} />
        {/each}
      </ul>
    </div>
  </div>
</div>
