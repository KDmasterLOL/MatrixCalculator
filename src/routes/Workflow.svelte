<script lang="ts">
	import Table from "./Table.svelte";
	import { Matrix } from "./matrix";

	let matrices = [
		Matrix.from_array([
			[0, 1, 2],
			[2, 3, 4],
		]),
	];
</script>

{#each matrices as matrix, i (i)}
	<Table bind:matrix edit={true} />
	<button
		on:click={() => {
			matrices.splice(i, 1);
			matrices = matrices;
		}}
		style:color="red">Remove table</button
	>
{/each}
<button
	on:click={() => {
		matrices = [...matrices, Matrix.from_matrix(matrices[matrices.length - 1])];
		matrices = matrices;
	}}
	style:color="green">Create new table</button
>
