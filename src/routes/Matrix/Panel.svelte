<script lang="ts">
  import type { Matrix } from "$lib/matrix";
  import { resize } from "$lib/actions";
  import { operations } from "./operations";
  import { clamp } from "$lib/helpers";
  let {
    edit = $bindable(false),
    fraction = $bindable(false),
    selected_operation = $bindable(null),
    matrix = $bindable(),
    copy,
    paste,
    round,
    change_size,
  }: {
    edit: boolean;
    fraction: boolean;
    selected_operation: string | null;
    matrix: Matrix;
    copy: () => void;
    paste: () => void;
    round: (digits: number) => void;
    change_size: (offset: [number, number]) => void;
  } = $props();
  let round_digits = 1;
</script>

<menu
  class="m-auto max-w-[1000px] grid-flow-row-dense w-fit grid grid-cols-[repeat(auto-fit,minmax(50px,175px))] gap-2 list-none justify-center"
>
  <li class="row-span-2">
    <button onclick={() => (edit = !edit)}>View/Edit</button>
  </li>
  {#if edit}
    <li class="row-span-2 grid grid-rows-subgrid">
      <button onclick={paste}>Paste from clipboard</button>
      <button onclick={copy}>Copy to clipboard</button>
    </li>
    <li class="col-span-2 row-span-2 gap-2 grid grid-cols-subgrid">
      {#each operations as operation}
        <button onclick={() => (selected_operation = operation)}>
          Operation: {operation}</button
        >
      {/each}
    </li>
    <li class="flex justify-center items-center">
      <input
        type="number"
        name="row"
        value={matrix.row}
        dir="rtl"
        onchange={(ev) => change_size([ev.target.value, matrix.col])}
        use:resize={1.5}
      />
      <span class="mx-2">X</span>
      <input
        type="number"
        name="col"
        value={matrix.col}
        onchange={(ev) => change_size([matrix.row, ev.target.value])}
        use:resize={1.5}
      />
    </li>
    <li>
      <button class="inline" onclick={() => round(round_digits)}>Round</button>
      to
      <input
        type="number"
        bind:value={round_digits}
        min="1"
        max="6"
        use:resize={2}
        onchange={(e) => (e.target.value = clamp(e.target.value, 1, 6))}
      /> decimals
    </li>
  {:else}
    <button onclick={() => (fraction = !fraction)}>Fraction</button>
  {/if}
</menu>

<style lang="scss">
  menu {
    button:not(.inline) {
      @apply w-full h-full;
    }
  }
  button {
    @apply bg-blue-100 rounded-md p-2;
  }
</style>
