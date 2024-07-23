<script lang="ts">
  import type { Matrix } from "$lib/matrix.svelte";
  import { resize } from "$lib/actions";
  import { operations, type Operation } from "./operations";
  import { clamp } from "$lib/actions";
  let {
    edit = $bindable(false),
    fraction = $bindable(false),
    options = $bindable({}),
    selected_operation = $bindable(null),
    operation_history = $bindable(),
    matrix = $bindable(),
    copy,
    paste,
    round,
  }: {
    edit: boolean;
    fraction: boolean;
    options: { [key: string]: any };
    selected_operation: Operation | null;
    operation_history: number;
    matrix: Matrix;
    copy: () => void;
    paste: () => void;
    round: (digits: number) => void;
    change_size: (offset: [number, number]) => void;
  } = $props();

  let round_digits = $state(1);
  const change_row_size = (ev: Event) =>
    (matrix.row = parseFloat((ev.target as HTMLInputElement).value));
  const change_col_size = (ev: Event) =>
    (matrix.col = parseFloat((ev.target as HTMLInputElement).value));

  let buff_selected_operation: Operation = $state(operations[1]);
</script>

<menu
  class="m-auto max-w-[1000px] grid-flow-row-dense w-fit grid grid-cols-[repeat(auto-fit,minmax(50px,175px))] gap-2 list-none justify-center"
>
  <li class="row-span-2">
    <button class="btn" onclick={() => (edit = !edit)}>View/Edit</button>
  </li>
  {#if edit}
    <li class="row-span-2 grid grid-rows-subgrid">
      <button class="btn" onclick={paste}>Paste from clipboard</button>
      <button class="btn" onclick={copy}>Copy to clipboard</button>
    </li>
    <li class="flex justify-center items-center">
      <input
        type="number"
        name="row"
        value={matrix.row}
        dir="rtl"
        onchange={change_row_size}
        use:resize={1.5}
      />
      <span class="mx-2">X</span>
      <input
        type="number"
        name="col"
        value={matrix.col}
        onchange={change_col_size}
        use:resize={1.5}
      />
    </li>
    <li class="col-span-2 row-span-2 border border-primary">
      <button
        class="btn btn-sm inline"
        onclick={() => (selected_operation = buff_selected_operation)}
        >Do</button
      >
      <!-- <select name="operation" bind:value={buff_selected_operation}> -->
      <!--   {#each ["+", "-", "*", "/"] as operation} -->
      <!--     <option value={operation}>{operation}</option> -->
      <!--   {/each} -->
      <!-- </select> -->
      <select name="operation" bind:value={buff_selected_operation}>
        {#each operations as operation}
          <option value={operation}>{operation.name}</option>
        {/each}
      </select>
      {#if ["divide row", "divide col"].includes(buff_selected_operation.name)}
        by value
        <input
          type="number"
          use:resize={0}
          bind:value={options.value}
          placeholder="Value of selected cell"
          class="w-56 px-2 font-mono disable-arrows invalid:bg-error invalid:text-error-content"
        />
      {/if}
    </li>
    <li class="text-center">
      <button
        class="btn inline btn-sm"
        onclick={() => {
          operation_history += 1;
          round(round_digits);
        }}
      >
        Round
      </button>
      to
      <input
        type="number"
        bind:value={round_digits}
        min="1"
        max="6"
        use:resize={2}
        use:clamp={[1, 6]}
      /> <strong>decimals</strong>
    </li>
  {:else}
    <button class="btn" onclick={() => (fraction = !fraction)}>Fraction</button>
  {/if}
</menu>

<style lang="scss">
  input {
    @apply border-base-100;
    &:dir(rtl) {
      @apply pr-2;
    }
    &:not(:dir(rtl)) {
      @apply pl-2;
    }
  }
  menu {
    button:not(.inline) {
      @apply w-full h-full;
    }
  }
</style>
