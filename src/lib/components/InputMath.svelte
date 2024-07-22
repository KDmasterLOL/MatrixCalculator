<script lang="ts">
  import { evaluate } from "mathjs";
  import { resize } from "$lib/actions";

  let { value = $bindable(undefined), ...params } = $props<{
    value?: number;
    [key: string]: any;
  }>();
  const allow_pattern = /^[\d+\-\.\*\/^]+$/;

  const onchange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    value = evaluate(input.value);
    input.value = value;
    const event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
  };
  let prev_value = value;
  const oninput = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    if (allow_pattern.test(input.value) == false) input.value = prev_value;
    else prev_value = input.value;
  };
</script>

<input
  type="text"
  class="invalid:bg-error invalid:text-error-content"
  {oninput}
  use:resize={0}
  {value}
  {onchange}
  pattern={allow_pattern.toString().slice(1, -1)}
  {...params}
/>
