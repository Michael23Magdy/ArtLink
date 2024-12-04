import Tool from "./Tool";

class EraserTool extends Tool {
  constructor(canvasContext) {
    super(canvasContext);
    this.isErasing = false;
  }

  onMouseDown(event) {
    const { deleteShape } = this.canvasContext;
    if (event.target === event.target.getStage()) return;
    this.isErasing = true;
    // deleteShape(event.target.attrs.id);
  }

  onMouseMove(event) {
    const { deleteShape } = this.canvasContext;
    if (!this.isErasing || event.target === event.target.getStage()) return;
    // deleteShape(event.target.attrs.id);
  }

  onMouseUp(event) {
    this.isErasing = false;
  }
}


export default EraserTool;
