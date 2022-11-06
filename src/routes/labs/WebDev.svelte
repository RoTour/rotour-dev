<script lang="ts">
  import NavigationBtn from "@components/buttons/NavigationBtn.svelte";
  import AnimatedIconArrowRight from "@components/icons/animated-icons/AnimatedIconArrowRight.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import IconCarretRight from "../../components/icons/IconCaretRight.svelte";
  import LabCard from "./LabCard.svelte";

  const files = [
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

  let contents: { chapter: string, file: string }[] = [];
  let currentChapter = -1;
  let previousExited = true;
  let transitioningTo = 0;
  let direction;

  onMount(async () => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "unset";
    contents = files.reduce((acc: { chapter: string, file: string }[], curr: { chapter: string, files: string[] }) => {
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
          currentChapter = 0;
        });
    }));

    contents = contents;
  });

  const changeIndex = (idx: number) => {
    setTimeout(() => previousExited = false, 0); // technique du bled no jutsu
    transitioningTo = idx;
    direction = 500 * idx || 500;
    console.log({ transitioningTo, direction });
  };


</script>

<!--<div class="h-12 w-12 rotate-[135deg] hover:rotate-[495deg] transition-all duration-200 cursor-pointer hover:bg-gradient-to-r from-primary to-secondary rounded-xl"></div>-->
<div
  class="h-12 w-12 cursor-pointer rounded-xl relative transitioningGradientBg before:bg-gradient-to-r from-primary to-secondary"></div>

{#if currentChapter !== -1}
  {#if currentChapter > 0 }
    <div on:keydown={() => changeIndex(-1)} on:click={() => changeIndex(-1)}>
      <AnimatedIconArrowRight />
    </div>
    <!--    <NavigationBtn click={() => changeIndex(-1)} size={3} side={'left'}>-->
    <!--      <IconCarretLeft />-->
    <!--    </NavigationBtn>-->
  {/if}
  {#if currentChapter < contents.length - 1}
    <NavigationBtn click={() => changeIndex(1)} size={3} side={'right'}>
      <IconCarretRight />
    </NavigationBtn>
  {/if}
{/if}
{#each contents as { chapter, file }, index}
  {#if index === currentChapter && previousExited}
    <div in:fly={{x: direction, duration: 300}}
         out:fly={{x: -direction, duration: 300}}
         on:outrostart={() => console.log("outrostart", direction)}
         on:outroend={() => {currentChapter+=transitioningTo; previousExited = true}}>
      <LabCard content={file} />
    </div>
  {/if}
{/each}

<style>
  div.transitioningGradientBg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  div.transitioningGradientBg:hover::before {
    opacity: 1;
  }
</style>