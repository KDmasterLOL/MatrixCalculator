class Matrix {
  constructor(row = 1, col = 1) {
    this.array = Array.from({ length: row }, e => Array.from({ length: col }, e => 0));
  }
  get row() {
    return this.array.length
  }
  get col() {
    return this.array[0].length
  }
  set row(val) {
    if (val == 0) return;
    this.change_size(val, this.col)
  }
  set col(val) {
    if (val == 0) return;
    this.change_size(this.row, val)
  }
  static from_array(array) {
    let matrix = new Matrix(array.length, array[0].length)
    matrix.array = array
    return matrix
  }
  static from_string(string) {
    const array = string.split("\n")
      .map((x) => x.split(",").map((x) => parseFloat(x)))
    return this.from_array(array)
  }
  static from_matrix(matrix) {
    const array = Array.from(matrix.array.map(x => [...x]))
    return this.from_array(array)
  }
  divide(row, col, row_or_col = true) {
    const anchor = this.array[row][col];
    if (row_or_col) {
      for (let c = 0; c < this.col; c++) {
        this.array[row][c] /= anchor;
      }
    } else {
      for (let r = 0; r < this.row; r++) {
        this.array[r][col] /= anchor;
      }
    }
    return this
  }
  to_basis(row, col) {
    this.divide(row, col, true)
    for (let r = 0; r < this.array.length; r++) {
      if (r == row) continue;
      let multiplier = this.array[r][col];
      for (let c = 0; c < this.array[0].length; c++) {
        this.array[r][c] -= this.array[row][c] * multiplier;
      }
    }
    return this
  }
  offset_size(offset_row = 0, offset_col = 0) {
    if (offset_row != 0) {
      if (offset_row < 0) this.array.splice(this.row - 1, 1);
      else this.array.push(...Array(offset_row).fill(Array(this.col).fill(0)));
    }
    if (offset_col != 0) {
      if (offset_col < 0) {
        for (let r = 0; r < this.row; r++) {
          this.array[r].splice(this.col - 1, 1);
        }
      } else {
        for (let r = 0; r < this.row; r++) {
          this.array[r].push(...Array(offset_col).fill(0));
        }
      }
    }
    return this;
  }
  change_size(row = 0, col = 0) {
    return this.offset_size(row - this.row, col - this.col)
  }

  to_string() {
    return (this.array.map(x => x.join(','))).join('\n')
  }
}
export { Matrix };
