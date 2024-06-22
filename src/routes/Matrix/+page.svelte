<script lang="ts">
  import Table from "./Table.svelte";
  import { Matrix } from "$lib/matrix";
  import { fade } from "svelte/transition";

  let matrices = [new Matrix(3, 3)];
</script>

{#each matrices as matrix, i (matrix)}
  <div transition:fade={{ duration: 400 }}>
    <Table bind:matrix edit={true} />
    <button
      on:click={() => {
        matrices.splice(i, 1);
        matrices = matrices;
      }}
      style:color="red">Remove table</button
    >
  </div>
{/each}
<button
  on:click={() => {
    matrices = [
      ...matrices,
      matrices.length > 0
        ? Matrix.from_matrix(matrices[matrices.length - 1])
        : new Matrix(3, 3),
    ];
  }}
  style:color="green">Create new table</button
>
