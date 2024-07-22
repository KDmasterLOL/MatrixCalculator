<script lang="ts">
  import Table from "./Table.svelte";
  import { Matrix } from "$lib/matrix.svelte";
  import { slide, fade } from "svelte/transition";
  import { cubicIn } from "svelte/easing";
  import { onMount } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import Menu from "./Menu.svelte";

  let matrices = $state<Matrix[]>([]);
  onMount(() => {
    const l = localStorage.getItem("matrices");
    if (l)
      matrices = (JSON.parse(l) as Matrix[]).map((matrix) =>
        Matrix.from_matrix(matrix),
      );
    const save_matrices = () => {
      localStorage.setItem("matrices", JSON.stringify(matrices));
    };
    window.addEventListener("beforeunload", save_matrices);
    beforeNavigate(save_matrices);
  });

  const create_matrix = () => {
    matrices.push(
      matrices.length > 0
        ? Matrix.from_matrix(matrices[matrices.length - 1])
        : new Matrix(3, 3),
    );
    scrollToLastMatrix();
  };
  const remove_matrix = (i: number) => {
    matrices.splice(i, 1);
  };

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

<div class="snap-y snap-mandatory overflow-y-scroll h-full p-4">
  {#each matrices as matrix, i (matrix)}
    <article
      class="mb-8 snap-center h-full max-w-[min(1256px,94vw)] mx-auto pt-18"
      id="matrix_{i}"
      out:slide={{ duration: 1000, easing: cubicIn }}
      in:fade
    >
      <Table bind:matrix={matrices[i]} edit={true} fraction={false} />
      <Menu
        oncreate={i == matrices.length - 1 ? create_matrix : undefined}
        onremove={() => remove_matrix(i)}
      ></Menu>
    </article>
  {:else}
    <Menu oncreate={create_matrix}></Menu>
  {/each}
</div>
