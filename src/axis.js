import * as d3 from "d3";

import { sumTilIndex } from "./utils";

export function drawYAxis({ plot, AXIS, yScale }) {
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10, "s");
  plot
    .append("g")
    .attr("transform", `translate(${AXIS.PADDING.X},${AXIS.PADDING.Y})`)
    .call(yAxis);
}

export function drawXAxis({
  plot,
  sizes,
  AXIS,
  gap,
  PLOTY,
  xScale,
  sizeColorScale
}) {
  function circleX(d, i) {
    const offset = sumTilIndex(sizes, i - 1) + i * gap;
    const bars = offset + d.files.length / 2;
    return AXIS.PADDING.X + xScale(bars);
  }
  const xAxis = d3.axisBottom(xScale).ticks(0);
  plot
    .append("g")
    .selectAll("circle")
    .data(sizes)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", circleX)
    .attr("cy", PLOTY + AXIS.PADDING.Y + 10)
    .style("fill", "black");
  // .style("fill", function(d) {
  //   return sizeColorScale(d.files.length);
  // });
  plot
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
      return circleX(d, i) + 8;
    })
    .attr("y", PLOTY + AXIS.PADDING.Y + 13)
    .style("fill", "black");
  plot
    .append("g")
    .attr("transform", `translate(${AXIS.PADDING.X},${PLOTY + AXIS.PADDING.Y})`)
    .call(xAxis);
}
