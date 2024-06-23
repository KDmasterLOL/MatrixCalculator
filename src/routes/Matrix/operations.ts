export const operations = ["To basis", "Divide row", "Divide col"] as const
export type Operation = typeof operations[number]

