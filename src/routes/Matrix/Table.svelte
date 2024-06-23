<script lang="ts">
  import { Matrix } from "$lib/matrix.svelte";
  import MatrixComponent from "./Matrix.svelte";
  import { onMount } from "svelte";
  import Panel from "./Panel.svelte";
  import { round } from "$lib/helpers";
  import { paste, copy } from "$lib/helpers";
  import { type Operation, operations } from "./operations";

  let {
    edit = false,
    matrix = $bindable(),
    fraction = false,
  } = $props<{ edit: boolean; matrix: Matrix; fraction: boolean }>();

  const operations_callbacks: {
    [key in Operation]: (row: number, col: number) => void;
  } = {
    "To basis": (row, col) => (matrix = matrix.to_basis(row, col)),
    "Divide row": (row, col) => (matrix = matrix.divide(row, col, true)),
    "Divide col": (row, col) => (matrix = matrix.divide(row, col, false)),
  };
  let selected_operation: keyof typeof operations_callbacks | null =
    $state(null);
  const round_matrix = (digits: number) => {
    for (let i = 0; i < matrix.row; i++)
      for (let j = 0; j < matrix.col; j++)
        matrix.array[i][j] = round(matrix.array[i][j], digits);
  };

  const change_size = (new_size: [number, number]) => {
    matrix.change_size(new_size[0], new_size[1]);
  };

  const paste_matrix = () =>
    paste(
      (clipText: string) => (matrix.array = Matrix.from_string(clipText).array),
    );
  const copy_matrix = () => copy(matrix.to_string());
  onMount(() => {
    document.onkeydown = (e) => {
      if (e.key == "Escape") selected_operation = null;
    };
  });
  function process_click(row: number, col: number) {
    if (selected_operation) {
      operations_callbacks[selected_operation](row, col);
      selected_operation = null;
    }
  }
</script>

<section
  class="m-auto bg-base-300 p-2 rounded-xl border-accent border shadow-md shadow-accent"
>
  <div class="h-[50vh] flex items-center justify-center mb-8">
    <div class="overflow-scroll max-h-full max-w-full">
      {#key selected_operation}
        <MatrixComponent
          bind:matrix
          {edit}
          {fraction}
          {selected_operation}
          onclick={process_click}
        ></MatrixComponent>
      {/key}
    </div>
  </div>
  <Panel
    bind:edit
    bind:fraction
    bind:matrix
    bind:selected_operation
    paste={paste_matrix}
    copy={copy_matrix}
    round={round_matrix}
    {change_size}
  ></Panel>
</section>
