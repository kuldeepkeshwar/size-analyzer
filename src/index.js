import "./styles.scss";
import * as d3 from "d3";
import data from "./size-plugin.json";
import { nomaliseSizes } from "./utils";
import {
  createYScale,
  createBarColorScale,
  createSizeColorScale,
  createXScale
} from "./scale";
import { drawYAxis, drawXAxis } from "./axis";
import { drawGraph } from "./graph";
import { dimension } from "./dimension";

const DIMENSION = dimension();

const { files, sizes, gap, max } = nomaliseSizes(data);

const yScale = createYScale({ maxY: DIMENSION.GRAPH.HEIGHT, maxSize: max });
const barColorScale = createBarColorScale();
const xScale = createXScale({
  maxX: DIMENSION.GRAPH.WIDTH,
  fileCount: files.length
});
const sizeColorScale = createSizeColorScale({ sizes });

const plot = d3.select("#root").append("svg");
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
