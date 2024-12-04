import Shapes from "../shapes/Shapes";
import { generateShapeId } from "../components/utils";
import DrawingTool from "./drawingTool";

class RectangleTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.rectangle = null;
    this.startPoint = null;
  }

  // Handle mouse down event
  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;
    // Get the position where the mouse is pressed
    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    // Create a new rectangle
    this.rectangle = new window.Konva.Rect({
      x: pointerPosition.x,
      y: pointerPosition.y,
      width: 0,
      height: 0,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });

    // Add the rectangle to the layer
    layer.add(this.rectangle);
    layer.batchDraw();
  }

  // Handle mouse move event
  onMouseMove(event) {
    if (!this.isDrawing || !this.startPoint || !this.rectangle) return;
    const { stage, layer } = this.canvasContext;

    // Get the current pointer position
    const pointerPosition = stage.getPointerPosition();

    // Update the rectangle dimensions
    const width = pointerPosition.x - this.startPoint.x;
    const height = pointerPosition.y - this.startPoint.y;

    this.rectangle.width(width);
    this.rectangle.height(height);

    // Redraw the layer to reflect changes
    layer.batchDraw();
  }

  // Handle mouse up event
  onMouseUp(event) {
    if (this.rectangle) {
      this.canvasContext.addShape(getRectObject(this.rectangle));

      this.rectangle.destroy();

      this.isDrawing = false;
      this.rectangle = null;
      this.startPoint = null;
    }
  }
}

function getRectObject(rectangle) {
  return {
    id: generateShapeId(),
    type: Shapes.RECTANGLE,
    attributes: {
      x: rectangle.attrs.x,
      y: rectangle.attrs.y,
      width: rectangle.attrs.width,
      height: rectangle.attrs.height,
      fill: rectangle.attrs.fill,
      stroke: rectangle.attrs.stroke,
      strokeWidth: rectangle.attrs.strokeWidth,
    }
  };
}

export default RectangleTool;
