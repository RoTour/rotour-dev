<script lang="ts">
  import IconNextItem from "@components/icons/IconNextItem.svelte";

  export let size = "3rem";
</script>

<div class="flex justify-center items-center cursor-pointer
            [&>*:last-child]:hover:block">
  <span style="height: {size}; width: {size};">
    <IconNextItem />
  </span>
</div>
