export const resize = (node: HTMLInputElement, offset: number = 1) => {
  const res = () => { if (node.value.length > 0) node.style.width = (node.value.length + offset) + 'ch' }
  node.addEventListener("input", res)
  node.addEventListener("change", res)
  res()
}
