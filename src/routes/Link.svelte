<script>
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let href;
  let is_active = false;

  const check = () => (is_active = $page.url.pathname === href);

  onMount(check);
  afterNavigate(check);
</script>

<a {href} class={is_active ? "font-bold" : ""}><slot /></a>
