export function clamp(value: number, min: number, max: number) {
  if (value < min) return min
  else if (value > max) return max
  else return value
}
export function round(value: number, digits: number = 2) {
  const b = Math.pow(10, digits)
  return Math.round((value + Number.EPSILON) * b) / b
}
