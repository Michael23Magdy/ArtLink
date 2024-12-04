import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class CircleTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.circle = null;
    this.startPoint = null;
  }

  // Handle mouse down event
  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;

    // Get the position where the mouse is pressed
    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    // Create a new circle
    this.circle = new window.Konva.Circle({
      x: pointerPosition.x,
      y: pointerPosition.y,
      radius: 0,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });

    // Add the circle to the layer
    layer.add(this.circle);
    layer.batchDraw();
  }

  // Handle mouse move event
  onMouseMove(event) {
    if (!this.isDrawing || !this.startPoint || !this.circle) return;
    const { stage, layer } = this.canvasContext;

    // Get the current pointer position
    const pointerPosition = stage.getPointerPosition();

    // Calculate the radius based on the distance from the start point
    const dx = pointerPosition.x - this.startPoint.x;
    const dy = pointerPosition.y - this.startPoint.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    // Update the circle radius
    this.circle.radius(radius);

    // Redraw the layer to reflect changes
    layer.batchDraw();
  }

  // Handle mouse up event
  onMouseUp(event) {
    if (this.circle) {
      this.canvasContext.addShape(getCircleObject(this.circle));

      this.circle.destroy();

      this.isDrawing = false;
      this.circle = null;
      this.startPoint = null;
    }
  }
}

function getCircleObject(circle) {
  return {
    id: generateShapeId(),
    type: Shapes.CIRCLE,
    attributes: {
      x: circle.attrs.x,
      y: circle.attrs.y,
      radius: circle.attrs.radius,
      fill: circle.attrs.fill,
      stroke: circle.attrs.stroke,
      strokeWidth: circle.attrs.strokeWidth,
    },
  };
}

export default CircleTool;
