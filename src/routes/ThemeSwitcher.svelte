<script>
  import { theme_store } from "$lib/store/theme";
</script>

<label class="text-2xl swap swap-rotate">
  <input
    type="checkbox"
    class="border-none"
    checked={$theme_store == "light"}
    onclick={theme_store.toggle}
  />
  <span class="swap-on i-material-symbols-dark-mode"></span>
  <span class="swap-off i-material-symbols-light-mode"></span>
</label>
