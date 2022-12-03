<script lang="ts">
  import GradientText from "@components/text/GradientText.svelte";
  import type { Skill } from "@types/skill";

  export let skill: Skill;
  let randomBgPos = Math.floor(Math.random() * 3) + 1;
</script>

<GradientText className="font-poppins-bold animate-moving-bg bg-[length:200%]"
              gradientType="symmetric"
              style="animation-duration: {randomBgPos}s"
              type="p">
  {skill?.name}
</GradientText>
