<script lang="ts">
  import { goto } from "$app/navigation";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";
  import type Component from "svelte/types/compiler/compile/Component";
  import { getCurrentBreakPoint } from "../../utils/tailwind-helper";
  import CategoryItem from "./CategoryItem.svelte";
  import DockerLabs from "./DockerLabs.svelte";
  import WebDev from "./LabManager.svelte";

  type Category = {
    name: string;
    component: Component;
    contentType: string;
  };

  let blockTranslate = { value: "translateY(0px)", locked: false };
  let destination = "";
  let visible = true;
  let oldCategory: Category | null = null;
  let selectedCategory: Category | null = null;
  let selectedComponent;
  let itemsRemoved = false;
  let initialMousePosition: { x: number, y: number } | null = null;

  const categories = [{
    name: "Web Development",
    component: WebDev,
    contentType: "webdev"
  }, {
    name: "CSS Challenges",
    component: WebDev,
    contentType: "css"
  }, {
    name: "Docker Labs (Available Soon)",
    component: DockerLabs,
    contentType: "docker"
  }];

  let listener;

  onMount(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    if (getCurrentBreakPoint()[1] === "sm" || getCurrentBreakPoint()[1] === "md") return;
    addMovingBlockListener();
  });

  const moveMainBlockSmoothly = (movingBlock: HTMLElement, e: MouseEvent) => {
    if (blockTranslate.locked) {
      blockTranslate.value = `translate(0, 0)`;
      return;
    }
    if (!initialMousePosition) {
      initialMousePosition = { x: e.clientX, y: e.clientY };
    }
    const x = (e.clientX - initialMousePosition.x) / 20;
    const y = (e.clientY - initialMousePosition.y) / 15;
    blockTranslate.value = `translate(${ x }px, ${ y }px)`;
    if (movingBlock.classList.contains("transition-all") && movingBlock.classList.contains("duration-500")) {
      removeTransitionEffect();
    }
  };

  const addMovingBlockListener = () => {
    blockTranslate.locked = false;
    const movingBlock = document.getElementById("moving-block");
    listener = (e) => moveMainBlockSmoothly(movingBlock, e);
    document.addEventListener("mousemove", listener);
  };

  const removeMovingBlockListener = () => {
    document.removeEventListener("mousemove", listener);
  };

  const onBackBtnClicked = (event) => {
    destination = event.detail;

    // if coming from inner component
    if (selectedCategory || selectedComponent) {
      addTransitionEffect();
      oldCategory = selectedCategory;
      selectedComponent = null;
      selectedCategory = null;
      itemsRemoved = false;
      initialMousePosition = null;
      window.scrollTo(0, 0);
      return;
    }

    // if going back to home page
    visible = false;
  };

  const onCategorySelected = (category: Category) => {
    if (category.name === "Docker Labs (Available Soon)") return;
    addTransitionEffect();
    removeMovingBlockListener();
    initialMousePosition = null;
    blockTranslate.locked = true;
    blockTranslate.value = "translate(0, 0)";
    selectedCategory = category;
  };

  const addTransitionEffect = () => {
    const movingBlock = document.getElementById("moving-block");
    movingBlock.classList.add("transition-all");
    movingBlock.classList.add("duration-500");
  };

  const removeTransitionEffect = () => {
    const movingBlock = document.getElementById("moving-block");
    movingBlock.classList.remove("transition-all");
    movingBlock.classList.remove("duration-500");
  };
</script>

<AnimationFragment visible={visible}>
  <div on:outroend={() => goto(destination)} transition:fade>
    <Back links={[{name: "Back", href: "/"}]} on:navigate={onBackBtnClicked} />
    <div class="
    flex flex-col gap-4 w-screen lg:mx-auto select-none mt-16 lg:mt-[4.5rem]
    [&_h2>*]:font-poppins-bold [&_h2>*]:text-5xl
  " id="moving-block" style={`transform: ${blockTranslate.value}`}>

      {#each categories.filter((it) => !selectedCategory || it.name === selectedCategory.name) as {
        name,
        component,
        contentType,
      }, index (name)}
        <div
          on:keydown={() => onCategorySelected({name, component, contentType})}
          on:click={() => onCategorySelected({name, component, contentType})}
          in:fly={{x: -500, duration: 300, delay: 400}}
          out:fly={{x: -500, duration: 300, delay: 0}}
          on:outroend={() => (itemsRemoved = true)}
          on:introstart={() => (oldCategory = null)}
          on:introend={addMovingBlockListener}
          animate:flip={{delay: 100, duration: 400}}
        >
          {#key selectedCategory}
            <div>
              <CategoryItem name={name} expanded={selectedCategory}
                            className="{oldCategory?.name === name && 'md:ml-12'} transition-all" />
            </div>
          {/key}
        </div>
      {/each}


    </div>
    {#if selectedCategory && itemsRemoved}
      <div transition:fly={{x: 500, duration:300}}>
        <svelte:component this={selectedCategory.component}
                          contentType={selectedCategory.contentType}></svelte:component>
      </div>
    {/if}
  </div>
</AnimationFragment>
