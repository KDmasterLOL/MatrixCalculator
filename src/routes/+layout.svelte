<script>
  import "../app.scss";
  import Link from "./Link.svelte";
</script>

<header class="px-4 bg-zinc-200">
  <nav>
    <ul class="flex gap-8">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/Derivative">Derivative</Link></li>
      <li><Link href="/Matrix">Matrix</Link></li>
    </ul>
  </nav>
</header>
<main class="p-4">
  <slot />
</main>
