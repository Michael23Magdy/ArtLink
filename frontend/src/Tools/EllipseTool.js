import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class EllipseTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.ellipse = null;
    this.startPoint = null;
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    this.ellipse = new window.Konva.Ellipse({
      x: pointerPosition.x,
      y: pointerPosition.y,
      radiusX: 0,
      radiusY: 0,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });

    layer.add(this.ellipse);
    layer.batchDraw();
  }

  onMouseMove(event) {
    if (!this.isDrawing || !this.startPoint || !this.ellipse) return;

    const { stage, layer } = this.canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const radiusX = Math.abs(pointerPosition.x - this.startPoint.x);
    const radiusY = Math.abs(pointerPosition.y - this.startPoint.y);

    this.ellipse.radiusX(radiusX);
    this.ellipse.radiusY(radiusY);

    layer.batchDraw();
  }

  onMouseUp(event) {
    if (this.ellipse) {
      this.canvasContext.addShape(getEllipseObject(this.ellipse));
      this.ellipse.destroy();
      this.isDrawing = false;
      this.ellipse = null;
      this.startPoint = null;
    }
  }
}

function getEllipseObject(ellipse) {
  return {
    id: generateShapeId(),
    type: Shapes.ELLIPSE,
    attributes: {
      x: ellipse.attrs.x,
      y: ellipse.attrs.y,
      radiusX: ellipse.attrs.radiusX,
      radiusY: ellipse.attrs.radiusY,
      fill: ellipse.attrs.fill,
      stroke: ellipse.attrs.stroke,
      strokeWidth: ellipse.attrs.strokeWidth,
    },
  };
}

export default EllipseTool;
