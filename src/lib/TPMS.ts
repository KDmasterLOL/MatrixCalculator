import jStat_ from "jstat";
import Chart from "chart.js/auto"

function sturges(data: number[]) {
  return Math.round(1 + Math.log2(data.length))
}
function jStat(...args: any[]) {
  const res = jStat_(...args)

  res.moment = function(this: any, order = 1, initial = this.mean()) {
    return (
      this[0].reduce(
        (previous: number, current: number) => previous + (current - initial) ** order,
        0,
      ) / this[0].length
    );
  }
  res.split_to_bins = function(this: typeof res, count_bins = sturges(this[0])) {
    if (this[0].length == 0) throw Error("Datas is zero length")
    const min = this.min()
    const bin_size = this.range() / count_bins
    const edges = Array.from(new Array(count_bins), (_, i) => min + bin_size * i)
    const counts = Array.from(new Array(edges.length - 1), (_, i) => this[0].filter(
      (v) => (v >= edges[i]) && (i == count_bins - 1 ? v <= edges[i + 1] : v < edges[i + 1])
    ).length)
    return { bin_size, edges, counts }
  }
  return res
}
Object.assign(jStat, jStat_)

export function get_statistics(data: number[]) {
  if (!data || data.length == 0) return undefined;
  const obj = jStat(data);
  const ar = [
    "mode",
    "mean",
    "meandev",
    "median",
    "variance",
    "stdev",
    "range",
    "coeffvar",
    "skewness",
    "kurtosis"
  ] as const;

  type Res = { [key in typeof ar[number]]: any } & any
  const res =
    ar.reduce((ob, cur: typeof ar[number], _) => {
      ob[cur] = obj[cur]();
      return ob;
    }, {} as Res) as Res;

  res.meancoeffvar = res.meandev / res.mean;
  for (let order = 1; order <= 4; order++) {
    res["initial moment " + order] = obj.moment(order, 0);
    res["central moment " + order] = obj.moment(order);
  }

  return res;
}

export function draw_histogram(canvas: HTMLCanvasElement, datas: number[]) {
  if (datas.length == 0) return
  const { bin_size, edges, counts } = jStat(datas).split_to_bins()
  console.log({ bin_size, edges, counts })
  const data = edges.map((edge, i) => ({ x: edge + bin_size / 2, y: counts[i] }));

  const backgroundColor = Array(edges.length).fill('rgba(255, 99, 132, 0.2)');
  const borderColor = Array(edges.length).fill('rgba(255, 99, 132, 1)');

  const ctx = canvas.getContext('2d')!;
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Count elements',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        barPercentage: 0.95,
        categoryPercentage: 1,
        borderRadius: 5,
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          offset: false,
          grid: {
            offset: false
          },
          ticks: {
            stepSize: bin_size,
          },
          min: edges[0],
          max: edges[edges.length - 1],
          title: {
            display: true,
            text: 'Value',
            font: {
              size: 14
            }
          }
        },
        y: {
          // beginAtZero: true
          title: {
            display: true,
            text: 'Count',
            font: {
              size: 14
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (items) => {
              if (!items.length) return ''
              const item = items[0];
              const x = item.parsed.x;
              const min = x - bin_size / 2;
              const max = x + bin_size / 2;
              return `Range: ${min} - ${max}`;
            }
          }
        }
      }
    }
  });
  return myChart
}
