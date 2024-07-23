<script lang="ts">
  import Table from "./Table.svelte";
  import { Matrix } from "$lib/matrix.svelte";
  import { slide, fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { cubicIn, cubicOut } from "svelte/easing";
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
    scrollToMatrix(matrices.length - 1);
  };

  const transition_duration = 1000;
  let is_transition = $state(false);
  let last_timeout_id: number | undefined = undefined;

  const remove_matrix = (i: number) => {
    is_transition = true;
    if (last_timeout_id !== undefined) clearTimeout(last_timeout_id);
    last_timeout_id = setTimeout(
      () => {
        is_transition = false;
        last_timeout_id = undefined;
      },
      transition_duration * 2 + 150,
    );
    matrices.splice(i, 1);
  };

  const scrollToMatrix = (i: number, delay: number = 50) => {
    setTimeout(() => {
      const el = document.getElementById("matrix_" + i);
      if (!el) return;
      el.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, delay);
  };
</script>

<div
  class="{is_transition
    ? ''
    : 'snap-y snap-mandatory'} scroll-smooth overflow-y-scroll h-full flex flex-col p-4"
>
  {#each matrices as matrix, i (matrix)}
    {@const is_last = i == matrices.length - 1}
    <article
      class="mb-8 snap-center h-full max-w-[min(1256px,94vw)] mx-auto pt-18"
      id="matrix_{i}"
      out:fly={{
        y: -500,
        duration: transition_duration / 2,
        easing: cubicOut,
      }}
      in:fade={{ duration: transition_duration, easing: cubicIn }}
      animate:flip={{
        duration: transition_duration / 2,
        delay: transition_duration / 4,
      }}
    >
      <Table bind:matrix={matrices[i]} edit={true} fraction={false} />
      <Menu
        oncreate={is_last ? create_matrix : undefined}
        onremove={() => remove_matrix(i)}
      ></Menu>
    </article>
  {:else}
    <Menu oncreate={create_matrix}></Menu>
  {/each}
</div>
