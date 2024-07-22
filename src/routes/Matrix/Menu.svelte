<script lang="ts">
  let { onremove = undefined, oncreate = undefined } = $props<{
    onremove?: () => void;
    oncreate?: () => void;
  }>();
</script>

<menu class="flex justify-center items-center gap-8 mt-3">
  {#if onremove}
    <li>
      <button class="btn btn-error" onclick={() => onremove()}
        >Remove table</button
      >
    </li>
  {/if}
  {#if oncreate}
    <li>
      <button class="btn btn-success" onclick={oncreate}
        >Create new table</button
      >
    </li>
  {/if}
</menu>
