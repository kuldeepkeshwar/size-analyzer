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
  function circleX(d, i) {
    const offset = sumTilIndex(sizes, i - 1) + i * gap;
    const bars = offset + d.files.length / 2;
    return xScale(bars);
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
    .selectAll("circle")
    .data(sizes)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", circleX)
    .attr("cy", 15)
    .style("fill", "black");
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
      return circleX(d, i) - 45;
    })
    .attr("y", DIMENSION.AXIS.X.HEIGHT)
    .style("fill", "black");
}
