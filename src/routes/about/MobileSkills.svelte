<script lang="ts">
  import type { Skill } from "@types/skill";
  import { onDestroy } from "svelte";
  import { getCurrentBreakPoint } from "../../utils/tailwind-helper";

  export let skills: Skill[] = [];
  let rows: Skill[][] = [];
  let rowSize = 3;
  let rowsInfos: { scrollCount: number, ref: HTMLElement | undefined }[] = [
    { scrollCount: 0, ref: undefined },
    { scrollCount: 0, ref: undefined },
    { scrollCount: 0, ref: undefined }
  ];
  let intervals: number[] = [];

  const setupMobileAnimations = () => {
    rowsInfos.forEach((rowInfos) => {
      if (rowSize > 4) {
        const newInterval = setInterval(() => {
          if (!rowInfos.ref) return;
          rowInfos.ref.scrollLeft += 1;
          if (rowInfos.ref.scrollLeft >= rowInfos.ref.scrollWidth - rowInfos.ref.clientWidth) {
            rowInfos.ref.scrollLeft = 0;
          }
        }, 20);
        intervals.push(newInterval);
      } else {
        const newInterval = setInterval(() => {
          console.log(rowSize, rowInfos.ref?.scrollWidth, rowInfos.ref?.scrollWidth / rowSize / 2);
          if (rowInfos.ref) {
            if (rowInfos.scrollCount >= rowSize) {
              rowInfos.scrollCount = 0;
              rowInfos.ref.scrollTo({ left: 0, behavior: "auto" });
            }
            rowInfos.scrollCount++;
            rowInfos.ref.scrollBy({ left: rowInfos.ref.scrollWidth / rowSize / 2, behavior: "smooth" });
          }
        }, Math.floor(Math.random() * 2000) + 3000);
        intervals.push(newInterval);
      }
    });
  };

  const clearIntervals = () => {
    intervals.forEach((interval) => {
      clearInterval(interval);
    });
  };

  onDestroy(() => {
    clearIntervals();
  });

  $: if (skills.length > 0) {
    const mobileSkills = skills.filter((skill) => skill.name !== "CSS");
    const bp = getCurrentBreakPoint()[1];
    console.log(bp);
    rowSize = bp === "sm" ? 3 : bp === "md" ? 4 : mobileSkills.length;
    console.log("rowSize", rowSize);
    for (let i = 0; i < mobileSkills.length; i += rowSize) {
      rows.push([...mobileSkills.slice(i, i + rowSize), ...mobileSkills.slice(i, i + rowSize)]);
    }
    console.log("rows", rows);
  }

  $: {
    rowSize = rowSize;
    clearIntervals();
    setupMobileAnimations();
  }
</script>

<div class="flex flex-col text-gray-800 mx-auto">
  <h2 class="text-2xl font-poppins-bold p-4">My Top Skills :</h2>
  {#each rows as row, index}
    <div bind:this={rowsInfos[index].ref}
         class="flex overflow-x-scroll scrollbar-hide pointer-events-none transition-all">
      {#each row as skill}
        <div
          class="[&_*]:w-full [&_*]:h-full [&>p]:h-fit [&>svg]:aspect-square p-4 {rowSize === 3 ? 'basis-1/3' : rowSize === 4 ? 'basis-1/4' : 'basis-1/5'} shrink-0 flex flex-col justify-center flex-1">
          <svelte:component this={skill.icon} fill="#666666" />
          <p class="text-center">{skill.name}</p>
        </div>
      {/each}
    </div>
  {/each}
</div>
