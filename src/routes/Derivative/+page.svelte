<script>
  import Derivative from "./Derivative.svelte";
  let expression = "";
</script>

<article class="p-4 text-center flex flex-col h-full">
  <div
    class="mt-10 text-2xl grow-[0.6] basis-0 flex justify-center items-center"
  >
    <div>
      <Derivative {expression} variable="x" />
    </div>
  </div>
  <div class="grow-[0.4] basis-0">
    <input
      type="text"
      name="expression"
      placeholder="Your math expression"
      id="expression"
      bind:value={expression}
      class="px-2"
    />
  </div>
</article>
