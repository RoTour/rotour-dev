<script lang="ts">
  import type { Skill } from "@types/skill";
  import { onDestroy, onMount } from "svelte";

  export let skills: Skill[] = [];
  let rows: Skill[][] = [];
  let rowsInfos: { scrollCount: number, ref: HTMLElement | undefined }[] = [
    { scrollCount: 0, ref: undefined },
    { scrollCount: 0, ref: undefined },
    { scrollCount: 0, ref: undefined }
  ];
  let interval: number | undefined;
  onMount(() => {
    rowsInfos.forEach((rowInfos) => {
      interval = setInterval(() => {
        if (rowInfos.ref) {
          if (rowInfos.scrollCount >= 3) {
            rowInfos.scrollCount = 0;
            rowInfos.ref.scrollTo({ left: 0, behavior: "auto" });
          }
          rowInfos.scrollCount++;
          rowInfos.ref.scrollBy({ left: 375 / 3, behavior: "smooth" });
        }
      }, Math.floor(Math.random() * 2000) + 3000);
    });
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  $: if (skills.length > 0) {
    const mobileSkills = skills.filter((skill) => skill.name !== "CSS");
    for (let i = 0; i < mobileSkills.length; i += 3) {
      rows.push([...mobileSkills.slice(i, i + 3), ...mobileSkills.slice(i, i + 3)]);
    }
  }
</script>

<div class="flex flex-col text-gray-800 max-w-[65ch] mx-auto">
  <h2 class="text-2xl font-poppins-bold p-4">My Top Skills :</h2>
  {#each rows as row, index}
    <div bind:this={rowsInfos[index].ref}
         class="flex overflow-x-scroll scrollbar-hide pointer-events-none transition-all">
      {#each row as skill}
        <div
          class="[&_*]:w-full [&_*]:h-full [&>p]:h-fit [&>svg]:aspect-square p-4 basis-1/3 shrink-0 flex flex-col justify-center flex-1">
          <svelte:component this={skill.icon} fill="#666666" />
          <p class="text-center">{skill.name}</p>
        </div>
      {/each}
    </div>
  {/each}
</div>
