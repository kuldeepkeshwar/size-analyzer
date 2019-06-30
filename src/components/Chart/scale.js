import * as d3 from "d3";
const kilo = 1024;
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
    .domain([0, 20 * kilo, 40 * kilo, 100 * kilo])
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
    .domain(sizes.map(size => size.timestamp))
    .range(["lightblue", "orange", "lightgreen"]);
}
