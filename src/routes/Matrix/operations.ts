import type { Matrix } from "$lib/matrix.svelte"

export const operation_names = ["to basis", "divide row", "divide col", "round"] as const
export type operation_name = typeof operation_names[number]
export interface Operation {
  name: operation_name
  handler: Function
}
export const operations: Operation[] = [
  {
    name: 'to basis',
    handler:
      (matrix: Matrix, options: { row: number, col: number }) => {
        matrix.to_basis(options.row, options.col)
      }
  },
  {
    name: 'divide row',
    handler: (matrix: Matrix, options: { row: number, col: number, value?: number }) => {
      const { row, col, value } = options
      const v = value || matrix.array[row][col!]
      for (let c = 0; c < matrix.col; c++) matrix.array[options.row][c] /= v
    }
  },
  {
    name: 'divide col',
    handler: (matrix: Matrix, options: { col: number, row: number, value?: number }) => {
      const { row, col, value } = options
      const v = value || matrix.array[row!][col]
      for (let r = 0; r < matrix.row; r++) matrix.array[r][options.col] /= v
    }
  },
  {
    name: 'round',
    handler: (matrix: Matrix, options: { col: number, row: number, value?: number }) => {
      const { row, col, value } = options
      const v = value || matrix.array[row!][col]
      for (let r = 0; r < matrix.row; r++) matrix.array[r][options.col] /= v
    }
  },
]
