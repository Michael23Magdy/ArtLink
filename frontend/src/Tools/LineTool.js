import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class LineTool extends DrawingTool {
  constructor(canvasContext, strokeColor, strokeWidth) {
    super(canvasContext, null, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.line = null;
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();

    this.line = new window.Konva.Line({
      points: [pointerPosition.x, pointerPosition.y],
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      lineCap: "round",
      lineJoin: "round",
    });

    layer.add(this.line);
    layer.batchDraw();
  }

  onMouseMove(event) {
    if (!this.isDrawing || !this.line) return;

    const { stage, layer } = this.canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const newPoints = this.line.points();
    newPoints[2] = pointerPosition.x;
    newPoints[3] = pointerPosition.y;
    this.line.points(newPoints);

    layer.batchDraw();
  }

  onMouseUp(event) {
    if (this.line) {
      this.canvasContext.addShape(getLineObject(this.line));
      this.line.destroy();
      this.isDrawing = false;
      this.line = null;
    }
  }
}

function getLineObject(line) {
  // getting center of the shape
  const points = line.points();
  let minX = points[0];
  let maxX = points[0];
  let minY = points[1];
  let maxY = points[1];
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const center_x = (maxX + minX) / 2;
  const center_y = (maxY + minY) / 2;

  // Adjust points to be relative to the new center
  const adjustedPoints = points.map((coord, i) => {
    return i % 2 === 0 ? coord - center_x : coord - center_y;
  });

  return {
    id: generateShapeId(),
    type: Shapes.LINE,
    attributes: {
      points: adjustedPoints,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
      x: center_x, // Center of the shape
      y: center_y, // Center of the shape
    },
  };
}

export default LineTool;
