<script lang="ts">
  import Table from "./Table.svelte";
  import { Matrix } from "$lib/matrix.svelte";
  import { slide, fade } from "svelte/transition";
  import { cubicIn } from "svelte/easing";
  import { onMount } from "svelte";

  let matrices = $state<Matrix[]>([]);
  onMount(()=>{
  const l = localStorage.getItem('matrices')
    if(l)
      matrices = (JSON.parse(l) as Matrix[])
      .map(matrix=>Matrix.from_matrix(matrix))
    window.addEventListener("beforeunload", () => {localStorage.setItem('matrices', JSON.stringify(matrices))})
  })

  const create_matrix = () => {
    matrices.push(
      matrices.length > 0
          ? Matrix.from_matrix(matrices[matrices.length - 1])
          : new Matrix(3, 3)
    )
    scrollToLastMatrix();
  }
  const remove_matrix = (i:number) => { matrices.splice(i, 1); }

  function scrollToLastMatrix() {
    setTimeout(() => {
      const el = document.getElementById("matrix_" + (matrices.length - 1));
      console.log(el, "matrix_" + (matrices.length - 1));
      if (!el) return;
      el.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 200);
  }
</script>
{#snippet btn_new_matrix()}
  <button
    class="btn btn-success"
    onclick={create_matrix}>Create new table</button
  >
{/snippet}
<div class="snap-y snap-mandatory overflow-y-scroll h-full">
{#each matrices as matrix, i (matrix)}
  <article
    class="mb-8 snap-center"
    id="matrix_{i}"
    out:slide={{ duration: 1000, easing: cubicIn }}
    in:fade
  >
    <Table bind:matrix={matrices[i]} edit={true} fraction={false} />
    <menu class="flex justify-center items-center gap-8 mt-3">
      <li>
        <button
          class="btn btn-error"
          onclick={()=>remove_matrix(i)}>Remove table</button
        >
      </li>
      {#if i == matrices.length - 1}
        <li>
          {@render btn_new_matrix()}
        </li>
      {/if}
    </menu>
  </article>
  {:else}
{@render btn_new_matrix()}
{/each}
</div>
