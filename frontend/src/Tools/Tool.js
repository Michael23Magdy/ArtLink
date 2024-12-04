class Tool {
    constructor(canvasContext){
        this.canvasContext = canvasContext;
    }

    setContext(canvasContext){
        this.canvasContext = canvasContext;
    }
    onMouseDown(event) {}
    onMouseMove(event) {}
    onMouseUp(event) {}
    onDblClick(event) {}
    onClick(event) {}
    onKeyDown(event) {}
}

export default Tool;