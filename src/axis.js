import * as d3 from "d3";

import { sumTilIndex } from "./utils";

export function drawYAxis({ plot, DIMENSION, yScale }) {
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10, "s");
  plot
    .append("g")
    .attr(
      "transform",
      `translate(${DIMENSION.PADDING.LEFT + DIMENSION.AXIS.Y.WIDTH},${
        DIMENSION.PADDING.TOP
      })`
    )
    .call(yAxis);
}

export function drawXAxis({
  plot,
  sizes,
  gap,
  xScale,
  sizeColorScale,
  DIMENSION
}) {
  function calculateX(d, i) {
    const x = sumTilIndex(sizes, i - 1) + i * gap;
    return xScale(x);
  }
  const xAxis = d3.axisBottom(xScale).ticks(0);
  const container = plot.append("g");
  container.attr(
    "transform",
    `translate(${DIMENSION.PADDING.LEFT + DIMENSION.AXIS.Y.WIDTH},
      ${DIMENSION.PADDING.TOP + DIMENSION.GRAPH.HEIGHT})`
  );
  container.append("g").call(xAxis);
  container
    .append("g")
    .selectAll("rect")
    .data(sizes)
    .enter()
    .append("rect")
    .attr("height", 6)
    .attr("width", d => xScale(d.files.length))
    .attr("x", calculateX)
    .attr("y", DIMENSION.AXIS.X.HEIGHT / 2)
    .style("fill", d => sizeColorScale(d.timestamp));
  container
    .append("g")
    .selectAll("text")
    .data(sizes)
    .enter()
    .append("text")
    .attr("font-size", 10)
    .text(function(d) {
      const _d = new Date();
      _d.setTime(d.timestamp);
      return _d.toLocaleString();
    })
    .attr("x", function(d, i) {
      return calculateX(d, i);
    })
    .attr("y", DIMENSION.AXIS.X.HEIGHT)
    .style("fill", "black");
}
