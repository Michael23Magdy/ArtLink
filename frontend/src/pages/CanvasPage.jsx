import { useParams } from 'react-router-dom';
import ControlMenu from "../components/ControlMenu/ControlMenu";
import logo3 from '../assets/logo3.png'
import styles from './CanvasPage.module.css'
import ToolBar from "../components/ToolBar/ToolBar";
import Canvas from "../components/Canvas/Canvas";
import { useEffect, useRef, useState } from "react";
import TOOLS from "../Tools/Tools";
import ToolPool from "../Tools/ToolPool";


function CanvasPage(){
    const [selectedTool, setSelectedTool] = useState(TOOLS.SELECT);
    const [fillColor, setFillColor] = useState("#00bb00");
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [strokeWidth, setStrokeWidth] = useState(5);
    const toolPool = useRef(null);
    const roomRef = useRef(null);
    const canvasRef = useRef(null); // Ref for Canvas
    const { id } = useParams(); // Access the id parameter from the route


    if (!toolPool.current) {
        toolPool.current = new ToolPool(fillColor, strokeColor, strokeWidth);
    }
    
    useEffect(() => {
        document.title = "Art Link - Drawing Canvas";
    }, []);

    useEffect(() => {
        toolPool.current.updateContext(fillColor, strokeColor, strokeWidth );
    }, [fillColor, strokeColor, strokeWidth]);

    const handleExportPNG = () => {
        if (canvasRef.current) {
          canvasRef.current.exportToPNG(); // Trigger export
        }
    };
    const handleExportJSON = () => {
        if (canvasRef.current) {
          canvasRef.current.exportShapesToJSON(); // Trigger export
        }
    };
    const handleExportXML = () => {
        if (canvasRef.current) {
          canvasRef.current.exportShapesToXML(); // Trigger export
        }
    };
    const handleImport = (file) => {
        if (canvasRef.current) {
          canvasRef.current.loadShapes(file); // Trigger export
        }
    };

    const handleUndo = () => {
        if (roomRef.current) roomRef.current.undo();
    };

    const handleRedo = () => {
        if (roomRef.current) roomRef.current.redo();
    };

    return(
        <>
            <Canvas
                ref={canvasRef}
                selectedTool={selectedTool}
                toolPool={toolPool.current}
                roomRef={roomRef}
                roomId={id}
            />
            <ToolBar
                fillColor={fillColor}
                setFillColor={setFillColor}
                strokeColor={strokeColor}
                setStrokeColor={setStrokeColor}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
            <ControlMenu 
                onExportPNG={handleExportPNG} 
                onExportJSON={handleExportJSON}
                onExportXML={handleExportXML}
                onImport={handleImport}
                onUndo={handleUndo}
                onRedo={handleRedo}
                roomId={id}
            />
            <img className={styles.logo} src={logo3} alt="Art Link" />
        </>
    )
}

export default CanvasPage;