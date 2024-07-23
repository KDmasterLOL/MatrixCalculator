<script lang="ts">
  import { Matrix } from "$lib/matrix.svelte";
  import MatrixComponent from "./Matrix.svelte";
  import Panel from "./Panel.svelte";
  import { paste, copy } from "$lib/helpers";
  import { type Operation } from "./operations";

  let {
    edit = false,
    matrix = $bindable(),
    fraction = false,
  } = $props<{ edit: boolean; matrix: Matrix; fraction: boolean }>();

  let operation_history = $state(0);
  let selected_operation: Operation | null = $state(null);

  const change_size = (new_size: [number, number]) => {
    matrix.change_size(new_size[0], new_size[1]);
  };

  const paste_matrix = () =>
    paste(
      (clipText: string) => (matrix.array = Matrix.from_string(clipText).array),
    );
  const copy_matrix = () => copy(matrix.to_string());
  const onkeydown = (e: KeyboardEvent) => {
    if (e.key == "Escape") selected_operation = null;
  };
  let options: { [key: string]: any } = $state({});
  function process_click(row: number, col: number) {
    if (selected_operation) {
      Object.assign(options, { row, col });
      selected_operation.handler(matrix, options);
      selected_operation = null;
      operation_history += 1;
    }
  }
</script>

<svelte:window {onkeydown} />
<section
  class="m-auto bg-base-100 p-2 rounded-xl shadow-[10px_10px_20px_oklch(var(--n)/0.5),_-10px_-10px_20px_oklch(var(--n)/0.2)]"
>
  {#key edit}
    <div
      class="h-[min(45vh,60vw)] flex items-center justify-center mb-8 overflow-hidden"
    >
      <div class="overflow-scroll no-scrollbar">
        {#key operation_history}
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
      bind:options
      bind:operation_history
      bind:matrix
      bind:selected_operation
      paste={paste_matrix}
      copy={copy_matrix}
      round={matrix.round.bind(matrix)}
      {change_size}
    ></Panel>
  {/key}
</section>
