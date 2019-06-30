import tip from "d3-tip";
const tooltip = tip()
  .attr("class", "d3-tip")
  .html(function(d) {
    return d.filename;
  });
export function drawGraph({ files, plot, DIMENSION, yScale, barColorScale }) {
  const container = plot.append("g");
  const barOuterWidth = DIMENSION.GRAPH.WIDTH / files.length;

  const BAR = {
    WIDTH: 0.9 * barOuterWidth,
    PADDING: 0.1 * barOuterWidth
  };
  container.call(tooltip);
  container
    .selectAll("rect")
    .data(files)
    .enter()
    .append("rect")
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide)
    .attr(
      "x",
      (d, i) =>
        DIMENSION.PADDING.LEFT +
        1 +
        DIMENSION.AXIS.Y.WIDTH +
        i * (BAR.WIDTH + BAR.PADDING)
    )
    .attr("width", BAR.WIDTH)

    .attr("fill", barColorScale(0))
    .attr("y", DIMENSION.GRAPH.HEIGHT + DIMENSION.PADDING.TOP)
    .attr("height", 0)
    .transition()
    .duration(800)
    .delay(function(d, i) {
      return i * 20;
    })
    .attr("fill", d => barColorScale(d.size))
    .attr("y", (d, i) => yScale(d.size) + DIMENSION.PADDING.TOP)
    .attr("height", d => DIMENSION.GRAPH.HEIGHT - yScale(d.size));
}
