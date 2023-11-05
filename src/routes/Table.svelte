<script lang="ts">
	import { Matrix } from "./matrix";
	import Fraction from "fraction.js";
	export let edit = false;
	export let matrix: Matrix = new Matrix();
	export let select_operation = false;
	export let fraction = true;
	const operations = {
		to_basis: (row, col) => (matrix = matrix.to_basis(row, col)),
		divide_row: (row, col) => (matrix = matrix.divide(row, col, true)),
		divide_col: (row, col) => (matrix = matrix.divide(row, col, false)),
	};
	let current_operation = "";

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
	function process_click(row, col) {
		if (select_operation) {
			operations[current_operation](row, col);
			select_operation = false;
		}
	}
</script>

<section>
	<table class:select={select_operation}>
		<thead>
			<tr>
				{#each { length: matrix.col } as _, i}
					<th>
						x_{i + 1}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each matrix.array as row, r (r)}
				<tr>
					{#each row as value, c (c)}
						<td>
							{#if edit}
								<input
									type="number"
									name=""
									bind:value={matrix.array[r][c]}
									style:width={String(matrix.array[r][c]).length + "ch"}
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
	<menu>
		<button on:click={() => (edit = !edit)}>View/Edit</button>
		{#if edit}
			<li>
				<button on:click={() => write()}>Paste from clipboard</button>
				<button on:click={() => copy()}>Copy to clipboard</button>
			</li>

			{#each Object.keys(operations) as operation}
				<li>
					<button
						on:click={() => {
							select_operation = true;
							current_operation = operation;
						}}
					>
						Operation: {operation}</button
					>
				</li>
			{/each}
			<li>
				{#each ["row", "col"] as control}
					<div style:width="max-content">
						<label for={control}>{control.toUpperCase()}:</label>
						<input
							type="number"
							name="row"
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
	input,
	label {
		font-family: monospace;
		font-weight: bold;
	}
	table {
		margin: auto;
		tr {
			th {
				user-select: none;
			}
			td {
				text-align: center;
				input {
					@extend %disable-arrows;
				}
			}
		}
		&.select {
			td {
				input:hover {
					background-color: yellow;
					cursor: pointer;
				}
			}
		}
	}
	menu {
		width: fit-content;
		margin: auto;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		li {
			list-style-type: none;
			width: min-content;
		}
	}
</style>
