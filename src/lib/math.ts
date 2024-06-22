import c_pkg from "complex.js";
import { derivative, isInteger, log, parse, create, all } from "mathjs";
import { parseTex, evaluateTex } from 'tex-math-parser'

const { Complex } = c_pkg

function find_derivative(expression, variable) {
  let expr, v, der
  try {
    expr = parse(expression);
    v = parse(variable);
    der = derivative(expr, v);
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.log(`Non Correct syntax ${e.message}`);
    }
    else if (e instanceof Error) {
      console.log(`${e.name}: ${e.message}`);
    }
    return null;

  }
  try {
    return `\\ddv{${expr.toTex()}}{${v.toTex()}}= ${der.toTex()}`;
  }
  catch (e) {
    if (e instanceof TypeError) {
      console.log(expression, e.message)
      return null
    }
  }
}

function roots_LNDU(roots: [Complex]) {
  const math = create(all)
  const customLatex = {
    'C': function(node, options) {
      return `C_{${node.args[0]}}`
    }
  }

  math.import(customLatex)

  let result = new Array<string>()
  for (let i = 0; i < roots.length; i++) {
    const element = roots[i];
    let b = ""
    if (element.im != 0) {
      b = `${element.im > 0 ? "\\cos" : "\\sin"}(${element.im}x)`
    }

    result.push(`C^{${i}} e^{${element.re}x} ${b}`)
  }
  return parseTex(result.join(" + "))
}

export {
  find_derivative,
  roots_LNDU
}
