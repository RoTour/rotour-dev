<script lang="ts">
  import NavigationBtn from "@components/buttons/NavigationBtn.svelte";
  import IconCarretLeft from "@components/icons/IconCarretLeft.svelte";
  import IconCarretRight from "@components/icons/IconCarretRight.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
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

{#if currentChapter !== -1}
  {#if currentChapter > 0 }
    <NavigationBtn click={() => changeIndex(-1)} size={2} side={'left'}>
      <IconCarretLeft />
    </NavigationBtn>
  {/if}
  {#if currentChapter < contents.length - 1}
    <NavigationBtn click={() => changeIndex(1)} size={2} side={'right'}>
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

