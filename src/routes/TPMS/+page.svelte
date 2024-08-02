<script lang="ts">
  import { draw_histogram, get_statistics } from "$lib/TPMS";
  import { data_store } from "$lib/store/tpms_data";
  import { onMount } from "svelte";

  let is_edit_data = $state(false);
  let field_data = $state($data_store.toString());
  const toggle_edit_data = () => {
    is_edit_data = !is_edit_data;
    data_store.set(
      field_data
        ? field_data.split(/[,\s]+/).map((v: string) => parseFloat(v))
        : [],
    );
  };
  let statistics = $derived.by(() => {
    if (!data_store || $data_store.length == 0) return undefined;
    return get_statistics($data_store);
  });
  let variational_series = $derived(
    $data_store.toSorted((a, b) => (a < b ? -1 : 0)),
  );
  let statistical_series = $derived.by(() => {
    const series = [...new Set($data_store)].toSorted((a, b) =>
      a < b ? -1 : 0,
    );
    const count_map = series.map((v) => [
      v,
      $data_store.filter((d) => d == v).length,
    ]);
    return count_map;
  });
  let histogram: HTMLCanvasElement;
  onMount(() => {
    draw_histogram(histogram, $data_store);
  });
</script>

<article class="p-4 overflow-y-scroll h-full">
  <div class="max-w-[1024px] mx-auto mb-16">
    <button
      class="mx-auto mb-4 block glass btn btn-xs"
      onclick={toggle_edit_data}
      >{is_edit_data ? "Save data" : "Edit data"}</button
    >
    {#if is_edit_data}
      <textarea
        name=""
        class="w-full min-h-32"
        bind:value={field_data}
        placeholder="Input array of data in format: value1, value2, value3"
        id=""
      ></textarea>
    {:else}
      <section class="font-mono text-lg flex flex-wrap">
        {#each $data_store as value}
          <span class="p-2 basis-0 grow">{value}</span>
        {:else}
          <p>There is no data</p>
        {/each}
      </section>
    {/if}
  </div>
  <hr class="my-2" />
  <article class="flex justify-around max-h-80 my-4">
    <div class="overflow-y-scroll pr-12">
      <table>
        <thead>
          <tr>
            <th class="pr-4">Index</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {#each variational_series as v, i}
            <tr>
              <th class="text-left pr-4">{i + 1}</th>
              <td>{v}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="overflow-y-scroll pr-12">
      <table>
        <thead>
          <tr>
            <th class="pr-4">Index</th>
            <th class="pr-12">Value</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {#each statistical_series as [v, c], i}
            <tr>
              <th class="pr-4 text-left">{i}</th>
              <td class="pr-12 text-right">{v}</td>
              <td>{c}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </article>
  <hr class="my-2" />
  <canvas bind:this={histogram} class="my-4"></canvas>
  {#if statistics}
    <table class="mx-auto">
      <tbody>
        {#each Object.keys(statistics) as key}
          <tr>
            <th class="pr-12 text-right">{key}</th>
            <td>{statistics[key]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</article>
