import type { Matrix } from "$lib/matrix.svelte"

export const operation_names = ["to basis", "divide row", "divide col", "round"] as const
export type operation_name = typeof operation_names[number]
export interface Operation {
  name: operation_name
  handler: Function
}
export type direction_operation_options = {
  direction: "row" | "col";
  index: number;
  operation: "+" | "-" | "*" | "/";
  value: number;
}
export function direction_operation(matrix: Matrix, { direction, index, operation, value }: direction_operation_options) {
  if (value == 0) throw "Value can't be zero";

  const apply_operation = (v: number): number => {
    switch (operation) {
      case '+': return v + value
      case '-': return v - value
      case '/': return v / value
      case '*': return v * value
    }

  }
  index -= 1
  for (let i = 0; i < matrix[direction == 'row' ? 'col' : 'row']; i++) {
    if (direction == 'col') matrix.array[i][index] = apply_operation(matrix.array[i][index])
    else matrix.array[index][i] = apply_operation(matrix.array[index][i])
  }
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
