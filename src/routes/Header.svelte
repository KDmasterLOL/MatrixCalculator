<script>
  import Link from "./Link.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<header class="row-span-1 z-50 px-8 flex items-center bg-base-200">
  <nav>
    <ul class="flex gap-8">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/Derivative">Derivative</Link></li>
      <li><Link href="/Matrix">Matrix</Link></li>
      <li><Link href="/TPMS">TPMS</Link></li>
      <!-- <li><Link href="/Test">Test</Link></li> -->
    </ul>
  </nav>
  <div class="grow"></div>
  <ThemeSwitcher></ThemeSwitcher>
</header>
