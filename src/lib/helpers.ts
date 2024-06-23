export function clamp(value: number, min: number, max: number) {
  if (value < min) return min
  else if (value > max) return max
  else return value
}
export function round(value: number, digits: number = 2) {
  const b = Math.pow(10, digits)
  return Math.round((value + Number.EPSILON) * b) / b
}
export function paste(callback: (text: string) => void) {
  navigator.clipboard
    .readText()
    .then(callback);
}
export function copy(text: string) {
  // @ts-ignore
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText(text);
    }
  });
}
