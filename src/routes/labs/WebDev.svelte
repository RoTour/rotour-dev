<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import AnimatedIconArrow from "../../components/icons/animated-icons/AnimatedIconArrow.svelte";
  import { getCurrentBreakPoint } from "../../utils/tailwind-helper";
  import LabCard from "./LabCard.svelte";

  export let contentType: "webdev" | "css" | "docker" = "webdev";

  const webDevChapters = [
    { chapter: "Introduction", files: ["/webdev/part0-introduction/readme.md"] },
    { chapter: "HTML/CSS", files: ["/webdev/part1-html-css/readme.md"] },
    { chapter: "Javascript", files: ["/webdev/part2-js-intro/readme.md"] },
    { chapter: "CSS Framework", files: ["/webdev/part3-css-frameworks/readme.md"] },
    { chapter: "CSS Framework", files: ["/webdev/part4-responsive/readme.md"] },
    { chapter: "JS Server & APIs", files: ["/webdev/part5-api-nodejs/readme.md"] },
    { chapter: "Cleaner code", files: ["/webdev/part6-clean-code/readme.md"] },
    {
      chapter: "React - Basics", files: [
        "/webdev/part7-react/0-basics/0-setup.md",
        "/webdev/part7-react/0-basics/1-tsx.md",
        "/webdev/part7-react/0-basics/2-css&scss.md",
        "/webdev/part7-react/0-basics/3-states.md",
        "/webdev/part7-react/0-basics/4-components.md",
        "/webdev/part7-react/0-basics/5-conditions.md",
        "/webdev/part7-react/0-basics/6-styling.md"
      ]
    }
  ];

  const cssChapters = [
    { chapter: "Circle arc", files: ["/csschanllenges/1-circle-arc/readme.md"] },
    { chapter: "Album cover", files: ["/csschanllenges/2-album-cover/readme.md"] },
    { chapter: "Card deck", files: ["/csschanllenges/3-card-stack/readme.md"] },
    { chapter: "Reviews emojis", files: ["/csschanllenges/4-review-emojis/readme.md"] }
  ];

  const chapters = new Map<string, { chapter: string, files: string[] }[]>([
    ["webdev", webDevChapters],
    ["css", cssChapters],
    ["docker", []]
  ]);

  let contents: { chapter: string, file: string }[] = [];
  let currentChapterIndex = -1;
  let previousExited = true;
  let transitioningTo = 0;
  let direction;
  let breakpoint;

  onMount(async () => {
    console.log(contentType);
    const currentChapter = chapters.get(contentType) ?? webDevChapters;
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "unset";
    contents = currentChapter.reduce((acc: { chapter: string, file: string }[], curr: { chapter: string, files: string[] }) => {
      acc.push(...curr.files.map(file => ({ chapter: curr.chapter, file })));
      return acc;
    }, []);

    await Promise.all(contents.map((content, index) => {
      return fetch(content.file).then(res => res.text())
        .then((data: string) => {
          const pathToFolder = content.file.slice(0, content.file.lastIndexOf("/"));
          return data.replace(/!\[.*?]\(/g, `![](${ pathToFolder }/`);
        })
        .then((res) => {
          contents[index].file = res;
          currentChapterIndex = 0;
        });
    }));
    breakpoint = getCurrentBreakPoint()[1];
    contents = contents;
  });

  const changeIndex = (idx: number) => {
    setTimeout(() => previousExited = false, 0); // technique du bled no jutsu
    transitioningTo = idx;
    direction = 500 * idx || 500;
    console.log({ transitioningTo, direction });
  };

</script>

{#if currentChapterIndex !== -1}
  {#if currentChapterIndex > 0 }
    <div on:keydown={() => changeIndex(-1)} on:click={() => changeIndex(-1)}
         transition:fade={{ duration: 200 }}
         class="fixed top-1/2 left-0 px-12">
      <div class="hidden lg:block">
        <AnimatedIconArrow size="4rem" direction="left" />
      </div>
    </div>
  {/if}
  {#if currentChapterIndex < contents.length - 1}
    <div on:keydown={() => changeIndex(1)} on:click={() => changeIndex(1)}
         transition:fade={{ duration: 200 }}
         class="fixed top-1/2 right-0 px-12">
      <div class="hidden lg:block">
        <AnimatedIconArrow size="4rem" />
      </div>
    </div>
  {/if}
{/if}

{#if breakpoint === 'sm' || breakpoint === 'md'}
  <div class="snap-x flex overflow-x-auto snap-mandatory	">
    {#each contents as { chapter, file }, index}
      <div class="snap-center w-screen min-w-fit max-w-screen ">
        <LabCard content={file} />
      </div>
    {/each}
  </div>
{:else }
  {#each contents as { chapter, file }, index}
    {#if index === currentChapterIndex && previousExited}
      <div in:fly={{x: direction, duration: 300}}
           out:fly={{x: -direction, duration: 300}}
           on:outroend={() => {currentChapterIndex+=transitioningTo; previousExited = true}}>
        <LabCard content={file} />
      </div>
    {/if}
  {/each}
{/if}