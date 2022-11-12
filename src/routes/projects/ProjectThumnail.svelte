<script lang="ts">
  export let imageLink = "";
  export let bgColor = "white";
</script>

<div class="aspect-video rounded-2xl border-2 border-solid border-black p-4 h-full"
     style="background-color: {bgColor};">
  <img alt="project" class="object-fill w-full h-full" src="{imageLink}" />
</div>