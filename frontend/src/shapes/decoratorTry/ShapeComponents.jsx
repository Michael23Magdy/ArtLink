import React, { forwardRef } from "react";
import { Rect, Circle, Ellipse, RegularPolygon, Line } from "react-konva";

export const RectangleShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <Rect
    {...shapeProps}
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() }) : undefined}
    onTransformEnd={onTransformEnd}
  />
));

export const CircleShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <Circle
    {...shapeProps}
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() }) : undefined}
    onTransformEnd={onTransformEnd}

  />
));

export const EllipseShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <Ellipse
    {...shapeProps}
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() }) : undefined}
    onTransformEnd={onTransformEnd}

  />
));

export const TriangleShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <RegularPolygon
    {...shapeProps}
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() }) : undefined}
    onTransformEnd={onTransformEnd}

  />
));

export const LineShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <Line
    {...shapeProps}
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({
      ...shapeProps,
      points: shapeProps.points.map((_, i) =>
        i % 2 === 0 ? e.target.x() : e.target.y()
      ),
    }) : undefined}
    onTransformEnd={onTransformEnd}

  />
));

export const PolygonShape = forwardRef(({ shapeProps, onChange, onClick, isSelectMode, onTransformEnd }, ref) => (
  <Line
    {...shapeProps}
    closed
    ref={ref} // Use the forwarded ref here
    draggable={isSelectMode}
    onClick={onClick}
    onDragEnd={isSelectMode ? (e) => onChange({
      ...shapeProps,
      points: shapeProps.points.map((_, i) =>
        i % 2 === 0 ? e.target.x() : e.target.y()
      ),
    }) : undefined}
    onTransformEnd={onTransformEnd}

  />
));
