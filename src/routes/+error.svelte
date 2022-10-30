<script>
  import {page} from '$app/stores';
  import Back from "@components/navigation/Back.svelte";
  import GradientText from "@components/text/GradientText.svelte";
  import PrimaryBtn from "@components/buttons/PrimaryBtn.svelte";
  import {goto} from "$app/navigation";
  import {fly} from "svelte/transition";
  import {onMount} from "svelte";

  let show = false;
  let onExit = () => {
    goto("/");
  };

  onMount(() => {
    show = true;
  });
</script>

<div class="h-screen flex flex-col">
  <Back links={[{name: "Home", href: "/"}]}/>
  {#if show}
    <div class="flex-1 flex flex-col items-center justify-center"
         in:fly={{y: 100, opacity: 0, duration: 300}} out:fly={{y: -100, opacity: 0, duration: 300}}
         on:outroend={onExit}>
      <GradientText additionalClasses="text-8xl font-poppins-bold" type="p">Are you lost ?</GradientText>
      {#if $page.status === 404}
        <p class="text-xl my-8">
          The page you are looking for does not exist.
        </p>
        <PrimaryBtn click={() => show = false}>Go back to Home page</PrimaryBtn>
      {/if}
    </div>
  {/if}
</div>

