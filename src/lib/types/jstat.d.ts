declare module 'jstat' {
  const jStat: {
    mean: (arr: number[]) => number;
    (...args): {
      min: () => number
      max: () => number
      mean: () => number
      mode: () => number | number[]
      meandev: () => number
      median: () => number
      variance: () => number
      stdev: () => number
      range: () => number
      coeffvar: () => number
      skewness: () => number
      kurtosis: () => number
      moment: (order: number, initial?: number) => number
      split_to_bins: (count_bins?: number) => { bin_size: number, edges: number[], counts: number[] }
      0: number[]
    }
    // ...
  };

  export default jStat;
}
