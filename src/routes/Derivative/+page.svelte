<script>
	import Derivative from "./Derivative.svelte";
	let expression = "x";
</script>

<input type="text" name="expression" id="expression" bind:value={expression} />
<Derivative {expression} variable="x" />
