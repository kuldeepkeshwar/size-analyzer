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
const [PLOTX, PLOTY] = [window.innerWidth - 80, window.innerHeight - 80];

const { files, sizes, gap, max: MAX } = nomaliseSizes(data);

const AXIS = {
  PADDING: { X: 30, Y: 10 }
};
const BAR = {
  WIDTH: 0.9 * (PLOTX / files.length),
  PADDING: 0.1 * (PLOTX / files.length)
};

const yScale = createYScale({ PLOTY, MAX });
const barColorScale = createBarColorScale();
const xScale = createXScale({ PLOTX, files });
const sizeColorScale = createSizeColorScale({ sizes });

const plot = d3.select("#root").append("svg");
drawGraph({
  files,
  plot,
  PLOTX,
  PLOTY,
  BAR,
  AXIS,
  yScale,
  barColorScale
});
drawYAxis({ plot, AXIS, yScale });
drawXAxis({
  plot,
  sizes,
  AXIS,
  gap,
  PLOTY,
  xScale,
  sizeColorScale
});
