<script lang="ts">
  import { Matrix } from "$lib/matrix";
  import MathC from "$lib/components/Math.svelte";
  import { resize } from "$lib/actions";
  import Fraction from "fraction.js";
  import { onMount } from "svelte";

  export let edit = false;
  export let matrix: Matrix = new Matrix();
  export let fraction = true;

  const operations: { [key: string]: (row: number, col: number) => void } = {
    "To basis": (row, col) => (matrix = matrix.to_basis(row, col)),
    "Divide row": (row, col) => (matrix = matrix.divide(row, col, true)),
    "Divide col": (row, col) => (matrix = matrix.divide(row, col, false)),
  };
  let current_operation: keyof typeof operations | null = null;
  let current_hover: null | [number, number] = null;

  function write() {
    navigator.clipboard
      .readText()
      .then((clipText) => (matrix = Matrix.from_string(clipText)));
  }
  function copy() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(matrix.to_string());
      }
    });
  }
  onMount(() => {
    document.onkeydown = (e) => {
      if (e.key == "Escape") current_operation = null;
    };
  });
  function process_click(row: number, col: number) {
    if (current_operation) {
      operations[current_operation](row, col);
      current_operation = null;
    }
  }

  const is_highlighted = (row: number, col: number): boolean => {
    if (current_hover == null) return false;
    switch (current_operation) {
      case "To basis":
        return current_hover[0] == row && current_hover[1] == col;
      case "Divide row":
        return current_hover[0] == row;
      case "Divide col":
        return current_hover[1] == col;
    }
    return false;
  };
</script>

<section class="m-auto bg-gray-200 p-2 rounded-xl border-black border">
  <div class="h-[50vh] flex items-center justify-center mb-8">
    <div class="overflow-scroll max-h-full max-w-full">
      {#key current_operation}
        <table>
          <thead>
            <tr>
              {#each { length: matrix.col + 1 } as _, i}
                <th class="select-none">
                  {#if i != 0}
                    <MathC expression={`x_{${i}}`}></MathC>
                  {/if}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each matrix.array as row, r (r)}
              <tr>
                <th class="pr-2 font-medium italic select-none">{r + 1}</th>
                {#each row as value, c (c)}
                  <td class="p-1.5 text-center border-[2px]">
                    {#if edit}
                      <input
                        type="number"
                        class="text-lg font-mono disable-arrows px-2
                      {is_highlighted(r, c) ? 'bg-yellow-400' : ''}"
                        bind:value={matrix.array[r][c]}
                        use:resize={0}
                        on:mouseenter={() => (current_hover = [r, c])}
                        on:mouseleave={() => (current_hover = null)}
                        on:click={() => process_click(r, c)}
                      />
                    {:else if fraction}
                      {new Fraction(value).toFraction()}
                    {:else}
                      {value}
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      {/key}
    </div>
  </div>
  <menu
    class="m-auto max-w-[900px] grid grid-cols-4 grid-rows-3 md:grid-cols-6 md:grid-rows-2 gap-2 list-none"
  >
    <li class="row-span-2">
      <button on:click={() => (edit = !edit)}>View/Edit</button>
    </li>
    {#if edit}
      <li>
        <button on:click={write}>Paste from clipboard</button>
      </li>
      <li class="col-start-2 row-start-2">
        <button on:click={copy}>Copy to clipboard</button>
      </li>
      <li class="grid grid-cols-subgrid col-span-2 row-span-2 gap-2">
        {#each Object.keys(operations) as operation}
          <button on:click={() => (current_operation = operation)}>
            Operation: {operation}</button
          >
        {/each}
      </li>
      <li
        class="row-start-3 col-span-4 md:col-span-1 md:row-span-2 flex justify-center items-center md:flex-col"
      >
        {#each ["row", "col"] as control}
          <div style:width="max-content">
            <label for={control}>{control.toUpperCase()}:</label>
            <input
              type="number"
              name={control}
              bind:value={matrix[control]}
              style:width={String(matrix[control]).length + 2 + "ch"}
            />
          </div>
        {/each}
      </li>
    {:else}
      <button on:click={() => (fraction = !fraction)}>Fraction</button>
    {/if}
  </menu>
</section>

<style lang="scss">
  @import "src/lib/styles/mixins.scss";
  menu {
    button {
      @apply w-full h-full;
    }
  }
  button {
    @apply bg-blue-50 rounded-md p-2;
  }
</style>
