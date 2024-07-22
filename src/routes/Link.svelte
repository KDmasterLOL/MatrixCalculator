<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount, type Snippet } from "svelte";

  let {href, children} = $props<{href:string, children: Snippet}>();
  let is_active = $state(false);

  const check = () => (is_active = $page.url.pathname === href);

  onMount(check);
  afterNavigate(check);
  
</script>

<a {href} class="transition-[font-weight,letter-spacing] {is_active ? 'font-bold tracking-widest' : ''}"
  >{@render children()}</a
>
