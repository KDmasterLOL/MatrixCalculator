<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";
  import "animate.css"
  import "../app.scss";
  import Header from "./Header.svelte";

  let { data, children } = $props<{
    data: { pathname: string };
    children: Snippet;
  }>();
  let transition_duration = 400
</script>

<Header></Header>
<main class="row-span-11 w-[100vw]">
  {#key data.pathname}
    <div class="w-full h-full" in:fly={{y:-200, delay: transition_duration, duration: transition_duration }} out:fly={{ y: 100, duration: transition_duration }}>
      {@render children()}
    </div>
  {/key}
</main>
