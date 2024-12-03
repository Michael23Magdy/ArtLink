import Shapes from "../shapes/Shapes";
import { generateShapeId } from "../components/utils";
import DrawingTool from "./drawingTool";
import TOOLS from "./Tools";

class TextTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isTyping = false;
    this.text = null;
  }

  // Handle mouse down event
  onMouseDown(event) {
    console.log(event);
    const { stage, layer } = this.canvasContext;

    if (this.isTyping) {
      // Stop typing mode
      this.isTyping = false;
      if (this.text) {
        this.canvasContext.addShape(getTextObject(this.text));
        this.text.destroy();
      }
      return;
    }

    // Start typing mode
    this.isTyping = true;
    const pointerPosition = stage.getPointerPosition();

    this.text = new window.Konva.Text({
      x: pointerPosition.x,
      y: pointerPosition.y,
      text: "", // Start with empty text
      fontSize: 4*this.strokeWidth,
      fontFamily: "Calibri",
      fill: this.fillColor,
      width: 400,
      align: "left",
    });

    layer.add(this.text);
    layer.batchDraw();
  }

  onKeyDown(event) {
    if (!this.text) return;

    const { layer } = this.canvasContext;

    // Handle special keys
    if (event.key === "Backspace") {
      const currentText = this.text.text();
      this.text.text(currentText.slice(0, -1)); // Remove last character
    } else if (event.key === "Enter") {
      this.text.text(this.text.text() + "\n"); // Add new line
    } else if (event.key.length === 1) {
      this.text.text(this.text.text() + event.key); // Add typed character
    }

    // Redraw the layer
    layer.batchDraw();
  }

  cleanup() {
    if (this.isTyping && this.text) {
      // Submit the text object to the canvas
      this.canvasContext.addShape(getTextObject(this.text));
      this.text.destroy();
      this.text = null;
      this.isTyping = false;
    }
  }
}

function getTextObject(text) {
    return {
      id: generateShapeId(),
      type: TOOLS.TEXT,
      attributes: {
        x: text.attrs.x,
        y: text.attrs.y,
        text: text.attrs.text,
        fontSize: text.attrs.fontSize,
        fontFamily: text.attrs.fontFamily,
        fill: text.attrs.fill,
        width: text.attrs.width,
      }
    };
  }

export default TextTool;
