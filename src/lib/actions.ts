import { clamp as _clamp } from "./helpers"
export const resize = (node: HTMLInputElement, offset: number = 1) => {
  const res = () => {
    if (node.value.length > 0) node.style.width = (node.value.length + offset) + 'ch'
    else node.style.width = ''
  }
  node.addEventListener("input", res)
  node.addEventListener("change", res)
  res()
}

export const clamp = (node: HTMLInputElement, [min, max]: number[]) => {
  const res = () => (node.value = _clamp(parseFloat(node.value), min, max).toString())
  node.addEventListener("input", res)
  node.addEventListener("change", () => {
    if (!node.value) node.value = min.toString()
    res()
  })
  res()
}

