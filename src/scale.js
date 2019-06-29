import * as d3 from "d3";
export function createYScale({ maxY, maxSize }) {
  return d3
    .scaleLinear()
    .domain([0, maxSize])
    .range([maxY, 0])
    .nice();
}
export function createBarColorScale() {
  return d3
    .scaleLinear()
    .domain([0, 20 * 1024, 40 * 1024, 100 * 1024])
    .range(["green", "cyan", "yellow", "red"]);
}

export function createXScale({ maxX, fileCount }) {
  return d3
    .scaleLinear()
    .domain([0, fileCount])
    .range([0, maxX]);
}
export function createSizeColorScale({ sizes }) {
  return d3
    .scaleQuantile()
    .domain(sizes.map(size => size.files.length))
    .range(["lightblue", "orange", "lightgreen"]);
}
