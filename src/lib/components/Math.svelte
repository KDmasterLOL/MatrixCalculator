<script>
  import katex from "katex";
  import "katex/dist/katex.min.css";
  export let expression = "";
  let options = {
    macros: {
      "\\d": "\\operatorname{d}",
      "\\ddv": "\\frac{\\d #1}{\\d #2}",
    },
  };
  let html = "";
  $: {
    try {
      html = katex.renderToString(expression, options);
    } catch (e) {
      if (e instanceof katex.ParseError) {
        console.log(e.message);
      }
    }
  }
</script>

{@html html}
