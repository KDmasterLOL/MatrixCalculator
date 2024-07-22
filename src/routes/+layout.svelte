<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import "../app.scss";
  import Link from "./Link.svelte";
  import type { Snippet } from "svelte";

  let { data, children } = $props<{
    data: { pathname: string };
    children: Snippet;
  }>();
  let transition_duration = 400
</script>

<header class="row-span-1 z-50 px-8 flex items-center bg-base-200">
  <nav>
    <ul class="flex gap-8">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/Derivative">Derivative</Link></li>
      <li><Link href="/Matrix">Matrix</Link></li>
      <!-- <li><Link href="/Test">Test</Link></li> -->
    </ul>
  </nav>
</header>
<main class="row-span-11">
  {#key data.pathname}
    <div class="w-full h-full" in:fly={{y:-200, delay: transition_duration, duration: transition_duration }} out:fly={{ y: 100, duration: transition_duration }}>
      {@render children()}
    </div>
  {/key}
</main>
