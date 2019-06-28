import tip from "d3-tip";
export function drawGraph({
  files,
  plot,
  PLOTX,
  PLOTY,
  BAR,
  AXIS,
  yScale,
  barColorScale
}) {
  const tooltip = tip()
    .attr("class", "d3-tip")
    .html(function(d) {
      return d.filename;
    });
  plot.call(tooltip);
  plot
    .attr("height", PLOTY + AXIS.PADDING.X)
    .attr("width", PLOTX + AXIS.PADDING.X)
    .selectAll("rect")
    .data(files)
    .enter()
    .append("rect")
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide)
    .attr("x", (d, i) => AXIS.PADDING.X + i * (BAR.WIDTH + BAR.PADDING))
    .attr("width", BAR.WIDTH)

    .attr("fill", barColorScale(0))
    .attr("y", PLOTY + AXIS.PADDING.Y)
    .attr("height", 0)
    .transition()
    .duration(800)
    .delay(function(d, i) {
      return i * 20;
    })
    .attr("fill", d => barColorScale(d.size))
    .attr("y", (d, i) => yScale(d.size) + AXIS.PADDING.Y)
    .attr("height", d => PLOTY - yScale(d.size));
}
