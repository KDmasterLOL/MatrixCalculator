<script lang="ts">
  import { onMount } from "svelte";
  import Typed from "typed.js";
  let text: HTMLElement;

  onMount(() => {
    const typed = new Typed(text, {
      strings: [
        "Edit matrix.",
        "Edit multiple matrices.",
        "Store matrices.",
        "Find derivative.",
        "Edit/Store multiple matrices. Find derivative.",
      ],
      typeSpeed: 25,
      backSpeed: 20,
      backDelay: 600,
      startDelay: 600,
      onComplete: function () {
        return text.parentElement?.querySelector(".typed-cursor")!.remove();
      },
    });
  });
</script>

<article class="prose prose-md p-4 mx-auto">
  <hgroup class="text-black dark:text-white">
    <h1 class="dark:text-white">EasyCalc</h1>
    <p class="text-2xl">
      <span bind:this={text}><i>Calculator</i>.</span>
    </p>
    <div
      class="text-2xl animate__animated animate__headShake animate__delay-5s animate__slow"
    >
      <mark class="p-1 rounded-lg bg-primary text-primary-content"
        >Everything is for your <strong class="text-primary-content"
          >convenience</strong
        ></mark
      >
    </div>
  </hgroup>
  <h2>Features</h2>
  <ul>
    <li>Simple deriative calculator</li>
    <li>Convenient Matrix calculator</li>
  </ul>
  <hr />
  <p class="text-lg">
    Feedback: <a href="mailto:DAlokosCHESTmat@gmail.com"
      >DAlokosCHESTmat@gmail.com</a
    >
  </p>
</article>
