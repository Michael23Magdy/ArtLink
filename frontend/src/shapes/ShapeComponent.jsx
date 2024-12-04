import React, { useEffect, useRef, useState } from "react";
import { Circle, Ellipse, Line, Transformer, RegularPolygon, Rect, Text } from "react-konva";
import Shapes from "./Shapes";
import TOOLS from "../Tools/Tools";

const ShapeComponent = ({ id, type, shapeProps, isSelected, onSelect, onChange, onDelete, onDuplicate, isSelectMode, isEraseMode }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (isSelected) {
      // Attach transformer to the shape
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        onDelete();
      }else if (event.key === 'c'){
        onDuplicate();
      }
    };
    if(isSelectMode && isSelected)
      window.addEventListener('keydown', handleKeyDown);
    else
      window.removeEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, isSelectMode, onDelete]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
  
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isEraseMode, onDelete]);


  

  const onMouseEnter = () => {
    if (isMouseDown && isEraseMode) {
      onDelete();
    }
  };

  // Render different shapes based on type
  const renderShape = () => {
    switch (type) {
      case TOOLS.TEXT:
        return(
          <Text 
            {...shapeProps}
            align= "left"
            id={id}
            ref={shapeRef}
            draggable={isSelectMode}
            onClick={isSelectMode?onSelect:undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode?onSelect:undefined}
            onDragEnd={isSelectMode?(e) => {
                onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
                });
            }:undefined}
            onTransformEnd={isSelectMode?(e) => {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
  
              // we will reset it back
              node.scaleX(1);
              node.scaleY(1);
              onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              fontSize: Math.max(node.fontSize() * scaleY),
              rotation: node.rotation()
              });
          }: undefined}
          />
        )
      case Shapes.RECTANGLE:
        return(
          <Rect
            {...shapeProps}
            id={id}
            ref={shapeRef}
            draggable={isSelectMode}
            onClick={isSelectMode?onSelect:undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode?onSelect:undefined}
            onDragEnd={isSelectMode?(e) => {
                onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
                });
            }:undefined}
            onTransformEnd={isSelectMode?(e) => {
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
    
                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
                rotation: node.rotation()
                });
            }: undefined}
          />
        );
      case Shapes.CIRCLE:
        return (
          <Circle
            {...shapeProps}
            id={id}
            ref={shapeRef}
            draggable={isSelectMode}
            onClick={isSelectMode ? onSelect : undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode ? onSelect : undefined}
            onDragEnd={
              isSelectMode
                ? (e) =>
                    onChange({
                      ...shapeProps,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                : undefined
            }
            onTransformEnd={
              isSelectMode
                ? (e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // Reset scaling to 1 and apply new dimensions
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                      ...shapeProps,
                      x: node.x(),
                      y: node.y(),
                      radius: Math.max(5, shapeProps.radius * scaleX),
                    });
                  }
                : undefined
            }
          />
        );
      case Shapes.ELLIPSE:
        return (
          <Ellipse
            {...shapeProps}
            id={id}
            ref={shapeRef}
            draggable={isSelectMode}
            onClick={isSelectMode ? onSelect : undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode ? onSelect : undefined}
            onDragEnd={
              isSelectMode
                ? (e) =>
                    onChange({
                      ...shapeProps,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                : undefined
            }
            onTransformEnd={
              isSelectMode
                ? (e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // Reset scaling to 1 and apply new dimensions
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                      ...shapeProps,
                      x: node.x(),
                      y: node.y(),
                      radiusX: Math.max(5, shapeProps.radiusX * scaleX),
                      radiusY: Math.max(5, shapeProps.radiusY * scaleY),
                      rotation: node.rotation()

                    });
                  }
                : undefined
            }
          />
        );
      case Shapes.TRIANGLE:
        return (
          <Line
            {...shapeProps}
            id={id}
            closed={true}
            ref={shapeRef}
            draggable={isSelectMode}
            onClick={isSelectMode ? onSelect : undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode ? onSelect : undefined}
            onDragEnd={
              isSelectMode
                ? (e) =>
                    onChange({
                      ...shapeProps,
                      x: e.target.x(),
                      y: e.target.y(),
                      
                    })
                : undefined
            }
            onTransformEnd={
              isSelectMode
                ? (e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                      ...shapeProps,
                      points: shapeProps.points.map((point, index) =>
                        index % 2 === 0 ? point * scaleX : point * scaleY
                      ),
                      rotation: node.rotation()

                    });
                  }
                : undefined
            }
          />
        );
      case Shapes.LINE:
        return (
          <Line
            {...shapeProps}
            id={id}
            ref={shapeRef}
            draggable={isSelectMode}
            lineCap="round"
            lineJoin="round"
            onClick={isSelectMode ? onSelect : undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode ? onSelect : undefined}
            onDragEnd={
              isSelectMode
                ? (e) =>
                    onChange({
                      ...shapeProps,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                : undefined
            }
            onTransformEnd={
              isSelectMode
                ? (e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                      ...shapeProps,
                      points: shapeProps.points.map((point, index) =>
                        index % 2 === 0 ? point * scaleX : point * scaleY
                      ),
                      rotation: node.rotation()

                    });
                  }
                : undefined
            }
          />
        );
      case Shapes.POLYGON: 
      case Shapes.FREE_HAND:
        return (
          <Line
            {...shapeProps}
            id={id}
            ref={shapeRef}
            closed={type==Shapes.POLYGON}
            lineCap="round"
            lineJoin="round"
            draggable={isSelectMode}
            onClick={isSelectMode ? onSelect : undefined}
            onMouseEnter={onMouseEnter}
            onTap={isSelectMode ? onSelect : undefined}
            onDragEnd={
              isSelectMode
                ? (e) =>
                    onChange({
                      ...shapeProps,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                : undefined
            }
            onTransformEnd={
              isSelectMode
                ? (e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                      ...shapeProps,
                      points: shapeProps.points.map((point, index) =>
                        index % 2 === 0 ? point * scaleX : point * scaleY
                      ),
                      rotation: node.rotation()

                    });
                  }
                : undefined
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={type !== "circle"} // Disable rotation for circles
          anchorCornerRadius={type === "circle" ? 5 : 0} // Customize corners for the circle
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resizing
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ShapeComponent;
