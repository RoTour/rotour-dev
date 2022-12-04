<script lang="ts">
  export let onClick: () => void = () => null;
  export let addClasses = "";
  export let disabled = false;
</script>

<button
  class={`border-black border-2 rounded-xl px-4 py-2 w-full font-poppins-bold bg-white ${disabled ? "cursor-not-allowed" : "hover:shadow-xl"} transition duration-300 ease-out ${addClasses}`}
  on:click|preventDefault={onClick}
>
  <slot/>
</button>
