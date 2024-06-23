<script lang="ts">
  import { Matrix } from "$lib/matrix";
  import MathC from "$lib/components/Math.svelte";
  import MatrixComponent from "./Matrix.svelte";
  import { resize } from "$lib/actions";
  import Fraction from "fraction.js";
  import { onMount } from "svelte";
  import Panel from "./Panel.svelte";
  import { round } from "$lib/helpers";

  export let edit = false;
  export let matrix: Matrix = new Matrix();
  export let fraction = true;

  const operations = ["To basis", "Divide row", "Divide col"] as const;
  type Operation = (typeof operations)[number];

  const operations_callbacks: {
    [key in Operation]: (row: number, col: number) => void;
  } = {
    "To basis": (row, col) => (matrix = matrix.to_basis(row, col)),
    "Divide row": (row, col) => (matrix = matrix.divide(row, col, true)),
    "Divide col": (row, col) => (matrix = matrix.divide(row, col, false)),
  };
  let selected_operation: keyof typeof operations_callbacks | null = null;
  let current_hover: null | [number, number] = null;
  const round_matrix = (digits: number) => {
    for (let i = 0; i < matrix.row; i++)
      for (let j = 0; j < matrix.col; j++)
        matrix.array[i][j] = round(matrix.array[i][j], digits);
  };

  const change_size = (offset: [number, number]) => {
    console.log(offset);
    matrix = matrix.change_size(offset[0], offset[1]);
  };

  function paste() {
    navigator.clipboard
      .readText()
      .then((clipText) => (matrix = Matrix.from_string(clipText)));
  }
  function copy() {
    // @ts-ignore
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(matrix.to_string());
      }
    });
  }
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

  const is_highlighted = (row: number, col: number): boolean => {
    if (current_hover == null) return false;
    switch (selected_operation) {
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

<section class="m-auto bg-gray-50 p-2 rounded-xl border-black border">
  <div class="h-[50vh] flex items-center justify-center mb-8">
    <div class="overflow-scroll max-h-full max-w-full">
      {#key selected_operation}
        <MatrixComponent
          {matrix}
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
    {paste}
    {copy}
    round={round_matrix}
    {change_size}
  ></Panel>
</section>
