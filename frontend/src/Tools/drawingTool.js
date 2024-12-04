import Tool from "./Tool";


class DrawingTool extends Tool{
    constructor(canvasContext, fillColor, strokeColor, strokeWidth){
        super(canvasContext);
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    setFillColor(fillColor){
        this.fillColor = fillColor;
    }
    setStrokeColor(strokeColor){
        this.strokeColor = strokeColor;
    }
    setStrokeWidth(strokeWidth){
        this.strokeWidth = strokeWidth;
    }
}

export default DrawingTool;