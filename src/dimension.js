export function dimension() {
  const [width, height] = [window.innerWidth - 100, window.innerHeight - 100];
  const PADDING = {
    TOP: 30,
    RIGHT: 30,
    BOTTOM: 30,
    LEFT: 30
  };
  const axis = {
    X: { HEIGHT: 30, WIDTH: 30 },
    Y: { HEIGHT: 30, WIDTH: 30 }
  };
  return {
    WIDTH: width,
    HEIGHT: height,
    PADDING: PADDING,
    AXIS: axis,
    GRAPH: {
      HEIGHT: height - (PADDING.TOP + PADDING.BOTTOM + axis.X.HEIGHT),
      WIDTH: width - (PADDING.RIGHT + PADDING.LEFT + axis.Y.WIDTH)
    }
  };
}
