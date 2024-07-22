<script lang="ts">
  import Math from "$lib/components/Math.svelte";
  import { find_derivative } from "$lib/math";
  let { expression, variable } = $props<{
    expression: string;
    variable: string;
  }>();
  let der,
    latex_expression: string = $state("");

  $effect(() => {
    latex_expression =
      find_derivative(expression, variable) || latex_expression;
  });
</script>

{#if expression}
  <Math expression={latex_expression}></Math>
{:else}
  <p class="select-none">EMPTY</p>
{/if}
