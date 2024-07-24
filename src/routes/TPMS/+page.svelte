<script lang="ts">
  let data: number[] = $state(Array.from(new Array(100), (_, i) => i));
  const parse_data = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    data = input.value.split(",").map((v: string) => parseFloat(v));
  };
</script>

<article class="p-4">
  <div>
    <label class="block" for="data">Input array of data </label>
    <input
      id="data"
      type="text"
      class="w-96 block"
      onchange={parse_data}
      placeholder="Input array of data in format: value1, value2, value3"
    />
  </div>
  <section class="grid grid-cols-[repeat(auto-fill,1fr)]">
    {#each data as value}
      <span class="p-2 basis-0 grow">{value}</span>
    {/each}
  </section>
</article>
