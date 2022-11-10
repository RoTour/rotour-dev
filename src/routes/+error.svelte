<script>
  import {page} from '$app/stores';
  import Back from "@components/navigation/Back.svelte";
  import GradientText from "@components/text/GradientText.svelte";
  import PrimaryBtn from "@components/buttons/PrimaryBtn.svelte";
  import {goto} from "$app/navigation";
  import {fly} from "svelte/transition";
  import {onMount} from "svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";

  let visible = false;
  let destination = '';
  let onExit = () => {
    goto(destination || '/');
  };

  onMount(() => {
    visible = true;
  });

  const beforeNavigating = (event) => {
    destination = event.detail;
    visible = false;
  }
</script>

<div class="h-screen flex flex-col p-4">
  <Back links={[{name: "Home", href: "/"}]} on:navigate={beforeNavigating}/>
  <AnimationFragment visible={visible} className="flex-1 flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center p-4"
         in:fly={{y: 100, opacity: 0, duration: 300}} out:fly={{y: -100, opacity: 0, duration: 300}}
         on:outroend={onExit}>
      <GradientText additionalClasses="text-4xl md:text-8xl font-poppins-bold text-center" type="p">Are you lost ?</GradientText>
      {#if $page.status === 404}
        <p class="text-lg md:text-xl my-8">
          The page you are looking for does not exist.
        </p>
        <PrimaryBtn click={() => visible = false}>Go back to Home page</PrimaryBtn>
      {/if}
    </div>
  </AnimationFragment>
</div>

