<script>
  import "../app.scss";
  import Link from "./Link.svelte";
</script>

<header class="row-span-1 px-8 flex items-center bg-base-200">
  <nav>
    <ul class="flex gap-8">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/Derivative">Derivative</Link></li>
      <li><Link href="/Matrix">Matrix</Link></li>
    </ul>
  </nav>
</header>
<main class="row-span-11 p-4">
  <slot />
</main>

<style lang="scss">
</style>
