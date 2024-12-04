import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class PencilTool extends DrawingTool {
  constructor(canvasContext, strokeColor, strokeWidth) {
    super(canvasContext, null, strokeColor, strokeWidth);
    this.currentLine = null; // Temporary shape being drawn
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext; // Access Stage and Layer from Canvas
    const pos = stage.getPointerPosition();
    this.currentLine = new window.Konva.Line({
      points: [pos.x, pos.y],
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      lineCap: "round",
      lineJoin: "round",
    });
    layer.add(this.currentLine);
    layer.batchDraw();
  }

  onMouseMove(event) {
    if (!this.currentLine) return;

    const { stage, layer } = this.canvasContext;
    const pos = stage.getPointerPosition();
    const points = this.currentLine.points().concat([pos.x, pos.y]);
    this.currentLine.points(points);
    layer.batchDraw();
  }

  onMouseUp(event) {
    if (this.currentLine) {
      // Finalize the shape
      this.canvasContext.addShape(getLineObject(this.currentLine));
      this.currentLine.destroy();
      this.currentLine = null;
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
    type: Shapes.FREE_HAND,
    attributes: {
      points: adjustedPoints,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
      x: center_x, // Center of the shape
      y: center_y, // Center of the shape
    },
  };
}

export default PencilTool;
