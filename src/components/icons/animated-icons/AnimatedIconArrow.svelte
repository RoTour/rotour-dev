<script lang="ts">
  import IconNextItem from "@components/icons/IconNextItem.svelte";

  export let size = "3rem";
  export let direction: "left" | "right" = "right";
</script>

<div class="flex justify-center items-center cursor-pointer
            [&>*:last-child]:hover:block"
     style="{direction === 'left' && 'transform: rotate(180deg)'}"
>
  <span style="height: {size}; width: {size};">
    <IconNextItem />
  </span>
</div>
