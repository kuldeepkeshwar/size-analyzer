import * as d3 from "d3";
export function createYScale({ PLOTY, MAX }) {
  return d3
    .scaleLinear()
    .domain([0, MAX])
    .range([PLOTY, 0])
    .nice();
}
export function createBarColorScale() {
  return d3
    .scaleLinear()
    .domain([0, 20 * 1024, 40 * 1024, 100 * 1024])
    .range(["green", "cyan", "yellow", "red"]);
}

export function createXScale({ PLOTX, files }) {
  return d3
    .scaleLinear()
    .domain([0, files.length])
    .range([0, PLOTX]);
}
export function createSizeColorScale({ sizes }) {
  return d3
    .scaleQuantile()
    .domain(sizes.map(size => size.files.length))
    .range(["lightblue", "orange", "lightgreen"]);
}
