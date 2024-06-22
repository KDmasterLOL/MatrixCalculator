<script>
  import Math from "$lib/components/Math.svelte";
  import { find_derivative } from "$lib/math";
  export let expression = "";
  export let variable = "x";
  let der, latex_expression;

  $: {
    latex_expression =
      find_derivative(expression, variable) || latex_expression;
  }
</script>

<p>{expression} - <Math {expression}></Math></p>
{#if expression}
  <Math expression={latex_expression}></Math>
{/if}
