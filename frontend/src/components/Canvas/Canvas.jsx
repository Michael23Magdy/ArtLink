import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import ShapeComponent from "../../shapes/ShapeComponent";
import TOOLS from "../../Tools/Tools";
import { generateShapeId } from "../utils";
import Room from "../../API/WebSocket";
import { saveAs } from "file-saver";
import { fetchShapes } from "../../API/Axios";


const Canvas = forwardRef(({ selectedTool, toolPool, roomRef, roomId }, ref) => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const stageRef = useRef();
  const layerRef = useRef();

  const addListOfShapes = (shapeList) => {
    shapeList.forEach(addShape);
  }

  const localAddListOfShapes = (shapeList) => {
    shapeList.forEach(localAddSahpe);
  }

  const addShape = (shape) => {
    localAddSahpe(shape);
    roomRef.current?.logShapeUpdate("add", shape);
  }

  const localAddSahpe = (shape) => {
    setShapes((prevShapes) => {
      // Check if the shape already exists based on its id
      const shapeExists = prevShapes.some((s) => s.id === shape.id);
      if (!shapeExists) {
        return [...prevShapes, shape];
      }
      return prevShapes;
    });
  };

  const modifyShape = (updatedShape) => {
    localModifySahpe(updatedShape);
    roomRef.current?.logShapeUpdate("modify", updatedShape);
  }

  const localModifySahpe = (updatedShape) => {
    setShapes( (p) => p.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      )
    );
  };

  const deleteShape = (shape) => {
    localDeleteSahpe(shape.id);
    roomRef.current?.logShapeUpdate("delete", shape);
  }

  const localDeleteSahpe = (shapeId) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== shapeId));
  };

  const reloadCanvas = async () => {
    try {
      const shapes = await fetchShapes(roomId);
      localAddListOfShapes(shapes);
      console.log(shapes);
    } catch (error) {
      console.error('Failed to reload canvas:', error);
    }
  };
  useEffect(() => {
    reloadCanvas();
  }, []);

  useEffect(() => {
    // adding event listenrs for keyBoard in the stage
    const handleKeyDown = (event) => {
      toolPool.getTool(selectedTool)?.onKeyDown(event);
    };
    if(selectedTool == TOOLS.TEXT){
      const stage = stageRef.current;
      if (stage) {
        const stageContent = stage.content;
        stageContent.tabIndex = 1;
    
        stageContent.addEventListener("keydown", handleKeyDown);
        stageContent.focus();
      } 

    } else {
      const stage = stageRef.current;
      const stageContent = stage.content;
      stageContent.removeEventListener("keydown", handleKeyDown);

      // finalize any text
      toolPool.getTool(TOOLS.TEXT).cleanup();
    }
    return () => {
      const stage = stageRef.current;
      if(!stage) return;
      const stageContent = stage.content;
      stageContent.removeEventListener("keydown", handleKeyDown);
    }
  }, [toolPool, selectedTool]);
  
  useEffect(() => {
    // Initialize the Room instance
    roomRef.current = new Room(roomId, localAddSahpe, localModifySahpe, localDeleteSahpe);
    roomRef.current.connect();
    console.log(`room: ${roomId}`);
    return () => {
      // Disconnect when component unmounts
      roomRef.current.disconnectRoom();
    };
  }, [roomRef]);

  useEffect(() => {
    if (stageRef.current && layerRef.current) {
      const canvasContext = {
        stage: stageRef.current,
        layer: layerRef.current,
        addShape,
        modifyShape,
        deleteShape,
      };
      toolPool.updateCanvasContext(canvasContext);
    }
  }, [toolPool]);

  useEffect(() => {
    if (selectedTool !== TOOLS.SELECT) {
      selectShape(null);
    }
  }, [selectedTool]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty || selectedTool !== TOOLS.SELECT) {
      selectShape(null);
    }
  };

  // delegating the event listener to the selected tool
  const handleMouseDown = (event) => {
    checkDeselect(event);
    toolPool.getTool(selectedTool)?.onMouseDown(event);
  };
  const handleMouseMove = (event) =>{
    toolPool.getTool(selectedTool)?.onMouseMove(event);
  }
  const handleMouseUp = (event) =>
    toolPool.getTool(selectedTool)?.onMouseUp(event);
  const handleDblClick = (event) =>
    toolPool.getTool(selectedTool)?.onDblClick(event);
  const handleClick = (event) => 
    toolPool.getTool(selectedTool)?.onClick(event);


  // Export function
  const exportToPNG = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "canvas-export.png";
      link.href = uri;
      link.click();
    }
  };


  // Function to export shapes as JSON
  const exportShapesToJSON = () => {
    const jsonData = JSON.stringify(shapes, null, 2); // Serialize the shapes array
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, "shapes.json");
  };

  // Function to export shapes as XML
  const exportShapesToXML = () => {
    const xmlData = shapes.map(shape => `
      <shape>
        <id>${shape.id}</id>
        <type>${shape.type}</type>
        <attributes>
          ${Object.entries(shape.attributes)
            .map(([key, value]) =>
              Array.isArray(value)
                ? `<${key}>${value.join(",")}</${key}>`
                : `<${key}>${value}</${key}>`
            )
            .join("")}
        </attributes>
      </shape>
    `).join("");

    const xmlContent = `<shapes>${xmlData}</shapes>`;
    const blob = new Blob([xmlContent], { type: "application/xml" });
    saveAs(blob, "shapes.xml");
  };

  // Function to load shapes from a JSON or XML file
  const loadShapes = (file) => {
    const reader = new FileReader();
    const fileName = file.name.toLowerCase();
  
    reader.onload = (e) => {
      if (fileName.endsWith(".json")) {
        // Parse JSON
        try {
          const loadedShapes = JSON.parse(e.target.result);
          addListOfShapes(loadedShapes); // Update shapes state
        } catch (err) {
          console.error("Invalid JSON file:", err);
          alert("Failed to load JSON file. Please ensure the file is in the correct format.");
        }
      } else if (fileName.endsWith(".xml")) {
        // Parse XML
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");
          const shapeElements = xmlDoc.getElementsByTagName("shape");
          const loadedShapes = Array.from(shapeElements).map((shapeEl) => {
            const id = shapeEl.getElementsByTagName("id")[0].textContent;
            const type = shapeEl.getElementsByTagName("type")[0].textContent;
  
            // Extract attributes
            const attributes = {};
            Array.from(shapeEl.getElementsByTagName("attributes")[0].children).forEach((attrEl) => {
              const key = attrEl.tagName;
              const value = attrEl.textContent.includes(",")
                ? attrEl.textContent.split(",").map(Number) // Convert back to array
                : isNaN(attrEl.textContent) ? attrEl.textContent : Number(attrEl.textContent); // Handle numbers
              attributes[key] = value;
            });
  
            return { id, type, attributes };
          });
  
          addListOfShapes(loadedShapes); // Update shapes state
        } catch (err) {
          console.error("Invalid XML file:", err);
          alert("Failed to load XML file. Please ensure the file is in the correct format.");
        }
      } else {
        alert("Unsupported file type. Please upload a JSON or XML file.");
      }
    };
  
    reader.readAsText(file);
  };
  



  // Expose exportToPNG using forwardRef
  useImperativeHandle(ref, () => ({
    exportToPNG,
    exportShapesToJSON,
    exportShapesToXML,
    loadShapes,  
  }));

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDblClick={handleDblClick}
      onClick={handleClick}
    >
      <Layer ref={layerRef}>
        {shapes.map((shape, index) => (
          <ShapeComponent
            key={index}
            id={shape.id}
            type={shape.type}
            shapeProps={shape.attributes}
            isSelected={shape.id === selectedId}
            onSelect={() => {
              selectShape(shape.id);
            }}
            onChange={(newAttrs) => {
              shape.attributes = newAttrs;
              modifyShape(shape);
            }}
            onDelete={() => deleteShape(shape)}
            onDuplicate={() => {
              let newShape = structuredClone(shape);
              newShape.id = generateShapeId();
              addShape(newShape);
            }}
            isSelectMode={selectedTool === TOOLS.SELECT}
            isEraseMode={selectedTool === TOOLS.ERASER}
          />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
