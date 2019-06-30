import React, { useEffect } from "react";
import * as d3 from "d3";
import {
  createYScale,
  createBarColorScale,
  createSizeColorScale,
  createXScale
} from "./scale";
import { drawYAxis, drawXAxis } from "./axis";
import { drawGraph } from "./graph";
import { nomaliseSizes } from "./../../utils";
import { dimension } from "./dimension";
function createChart({ selector, files, sizes, gap, max, DIMENSION }) {
  const yScale = createYScale({ maxY: DIMENSION.GRAPH.HEIGHT, maxSize: max });
  const barColorScale = createBarColorScale();
  const xScale = createXScale({
    maxX: DIMENSION.GRAPH.WIDTH,
    fileCount: files.length
  });
  const sizeColorScale = createSizeColorScale({ sizes });

  const plot = d3.select(selector).append("svg");
  plot.attr("height", DIMENSION.HEIGHT).attr("width", DIMENSION.WIDTH);

  drawYAxis({ plot, DIMENSION, yScale });
  drawXAxis({
    plot,
    sizes,
    gap,
    xScale,
    sizeColorScale,
    DIMENSION
  });
  drawGraph({
    files,
    plot,
    DIMENSION,
    yScale,
    barColorScale
  });
}
export default function Chart(props) {
  useEffect(
    function() {
      try {
        const { files, sizes, gap, max } = nomaliseSizes(props.sizes);
        const DIMENSION = dimension(props.width, props.height);
        document.getElementById("chart").innerHTML = "";
        createChart({
          selector: "#chart",
          files,
          sizes,
          gap,
          max,
          DIMENSION
        });
      } catch (e) {
        console.error(e);
      }
    },
    [props.sizes, props.width, props.height]
  );
  return <div id="chart" />;
}
