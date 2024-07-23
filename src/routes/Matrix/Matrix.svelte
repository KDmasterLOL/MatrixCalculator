<script lang="ts">
  import Math from "$lib/components/Math.svelte";
  import { Matrix } from "$lib/matrix.svelte";
  import Fraction from "fraction.js";
  import type { Operation } from "./operations";
  import InputMath from "$lib/components/InputMath.svelte";

  let {
    matrix = $bindable(),
    edit,
    fraction,
    selected_operation,
    onclick,
  } = $props<{
    matrix: Matrix;
    edit: boolean;
    fraction: boolean;
    selected_operation: Operation | null;
    onclick: (row: number, col: number) => void;
  }>();

  let current_hover: null | [number, number] = $state(null);
  const is_highlighted = (row: number, col: number): boolean => {
    if (current_hover == null || selected_operation === null) return false;
    switch (selected_operation.name) {
      case "to basis":
        return current_hover[0] == row && current_hover[1] == col;
      case "divide row":
        return current_hover[0] == row;
      case "divide col":
        return current_hover[1] == col;
    }
    return false;
  };
</script>

<table>
  <thead>
    <tr>
      {#each { length: matrix.col + 1 } as _, i}
        <th class="select-none">
          {#if i != 0}
            <Math expression={`x_{${i}}`}></Math>
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
              <InputMath
                bind:value={matrix.array[r][c]}
                class="border-none text-lg font-mono disable-arrows px-2
                                      {is_highlighted(r, c)
                  ? 'bg-accent text-accent-content'
                  : ''}"
                onmouseenter={() => (current_hover = [r, c])}
                onmouseleave={() => (current_hover = null)}
                onclick={() => onclick(r, c)}
              ></InputMath>
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
