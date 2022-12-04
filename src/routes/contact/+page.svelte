<script lang="ts">
  import { goto } from "$app/navigation";
  import { notification } from "$lib/notification.store";
  import BgDecoration from "@components/background/BgDecoration.svelte";
  import PrimaryBtn from "@components/buttons/PrimaryBtn.svelte";
  import Loading from "@components/Loading.svelte";
  import Back from "@components/navigation/Back.svelte";
  import AnimationFragment from "@components/svelte/AnimationFragment.svelte";
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { getDeviceType } from "../../utils/tailwind-helper";

  let visible = false;
  let loading = false;

  let email = "";
  let company = "";
  let message = "";

  let validationErrorMessage = "";

  let nextUrl = "";

  onMount(() => {
    const mobile = (getDeviceType() !== "desktop");
    document.body.style.overflow = mobile ? "scroll" : "hidden";
    visible = true;
  });

  const validate = () => {
    const errors = [];
    if (!email) {
      errors.push("Email is required");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Email is invalid");
    }
    if (!message) {
      errors.push("Message is required");
    }
    if (errors.length > 0) {
      validationErrorMessage = errors.join(", ");
      return false;
    }
    return true;
  };

  const sendMail = () => {
    if (!validate()) {
      return;
    }
    const payload = {
      to: "robin.tourne+rotourdev@gmail.com",
      from: "contact@rotour.dev",
      "templateId": "d-710108eab9cc461aa96c5705f22cebec",
      message: `From: ${ email }<br> ${ message }`,
      author: company
    };
    fetch("https://mail.rotour.dev/send", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        notification.set({ type: "success", message: "Message sent!" });
        goto("/");
      })
      .catch(() => {
        notification.set({ type: "error", message: "An error occurred while sending the message :(" });
      });
  };

  const beforeNavigating = (e: { detail: string }) => {
    visible = false;
    nextUrl = e.detail;
  };
</script>

<AnimationFragment className="h-screen flex items-center" visible={visible}>
  {#if loading}
    <Loading />
  {/if}
  <Back links={[{href: '/', name: "Back"}]} on:navigate={beforeNavigating} />
  <div class="absolute top-0 left-0 w-full h-full -z-10" on:outroend={() => goto(nextUrl)}
       transition:fly={{x: -1000, duration: 1000, easing: cubicOut}}>
    <BgDecoration height="50vh" posTop="0" rotate="-45deg" translateX="-25%" width="50vh" />
  </div>
  <div class="absolute top-0 left-0 w-full h-full -z-10"
       transition:fly={{y: -1000, duration: 1000, easing: cubicOut}}>
    <BgDecoration height="30vh" posRight="0%" posTop="0" rotate="-225deg" translateY="-50%" width="30vh" />
  </div>
  <div class="absolute top-0 left-0 w-full h-full -z-10"
       transition:fly={{y: 1000, duration: 1000, easing: cubicOut}}>
    <BgDecoration height="70vh" posBottom="0" posRight="0" rotate="-135deg" translateY="50%" width="70vh" />
  </div>
  <form class="w-full mt-12 md:m-auto md:w-4/5 lg:w-3/5 xl:w-2/5 p-4 relative"
        transition:fade={{duration: 500}}>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex flex-col flex-1">
        <label for="email">Email</label>
        <input bind:value={email} class="border-2 border-black rounded-lg text-md font-poppins-regular px-2 py-1"
               id="email"
               type="email" />
      </div>
      <div class="flex flex-col flex-1">
        <label for="company">Company</label>
        <input bind:value={company} class="border-2 border-black rounded-lg text-md font-poppins-regular px-2 py-1"
               id="company"
               type="text" />
      </div>
    </div>
    <div class="flex flex-col">
      <label for="message">Message</label>
      <textarea bind:value={message}
                class="border-2 border-black rounded-lg text-md font-poppins-regular px-2 py-1 resize-y"
                id="message" />
    </div>
    {#if validationErrorMessage}
      <div class="text-red-500 text-lg font-poppins-medium mt-2">{validationErrorMessage}</div>
    {/if}
    <PrimaryBtn addClasses="mt-4 ml-auto block" click="{sendMail}" size="md">Send</PrimaryBtn>
  </form>
</AnimationFragment>
