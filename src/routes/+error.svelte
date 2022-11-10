<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import PrimaryBtn from "@components/buttons/PrimaryBtn.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import GradientText from "@components/text/GradientText.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let visible = false;
  let destination = "";
  let message = "";
  let description = "";
  let onExit = () => {
    goto(destination || "/");
  };

  onMount(() => {
    visible = true;
    console.log("page");
    message = $page.url.searchParams.get("msg") || "Are you lost ?";
    description = $page.url.searchParams.get("desc") || "The page you are looking for does not exist.";
  });

  const beforeNavigating = (event) => {
    destination = event.detail;
    visible = false;
  };
</script>

<div class="h-screen flex flex-col">
  <Back links={[{name: "Home", href: "/"}]} on:navigate={beforeNavigating} />
  <AnimationFragment className="flex-1 flex flex-col items-center justify-center p-4" visible={visible}>
    <div class="flex flex-col items-center justify-center p-4"
         in:fly={{y: 100, opacity: 0, duration: 300}} out:fly={{y: -100, opacity: 0, duration: 300}}
         on:outroend={onExit}>
      <GradientText
        className="text-4xl md:leading-tight {message.length > 10 ? 'md:text-7xl' : 'md:text-8xl'} font-poppins-bold text-center"
        type="p">
        {message}
      </GradientText>
      {#if $page.status === 404}
        <p class="text-lg md:text-xl my-8">
          {description}
        </p>
        <PrimaryBtn click={() => visible = false}>Go back to Home page</PrimaryBtn>
      {/if}
    </div>
  </AnimationFragment>
</div>

