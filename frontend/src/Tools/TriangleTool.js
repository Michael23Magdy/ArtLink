import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class TriangleTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.triangle = null;
    this.startPoint = null;
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    this.triangle = new window.Konva.Line({
      points: [
        pointerPosition.x,
        pointerPosition.y,
        pointerPosition.x,
        pointerPosition.y,
      ],
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      closed: true, // Close the shape to form a triangle
    });

    layer.add(this.triangle);
    layer.batchDraw();
  }

  onMouseMove(event) {
    if (!this.isDrawing || !this.startPoint || !this.triangle) return;

    const { stage, layer } = this.canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const points = [
      this.startPoint.x,
      this.startPoint.y, // First point (start point)
      pointerPosition.x,
      pointerPosition.y, // Second point (current mouse position)
      this.startPoint.x + (pointerPosition.x - this.startPoint.x),
      this.startPoint.y, // Third point (base of the triangle)
    ];

    this.triangle.points(points);
    layer.batchDraw();
  }

  onMouseUp(event) {
    if (this.triangle) {
      this.canvasContext.addShape(getTriangleObject(this.triangle));
      this.triangle.destroy();

      this.isDrawing = false;
      this.triangle = null;
      this.startPoint = null;
    }
  }
}

function getTriangleObject(triangle) {
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
    type: Shapes.TRIANGLE,
    attributes: {
      points: adjustedPoints,
      fill: triangle.attrs.fill,
      stroke: triangle.attrs.stroke,
      strokeWidth: triangle.attrs.strokeWidth,
      x: center_x, // Center of the shape
      y: center_y, // Center of the shape
    },
  };
}

export default TriangleTool;
