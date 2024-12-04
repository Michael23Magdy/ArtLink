import { forwardRef, useEffect, useRef } from "react";
import { Transformer } from "react-konva";

const withTransformer = (ShapeComponent) => {
  const WrappedShape = forwardRef((props, ref) => (
    <ShapeComponent {...props} forwardedRef={ref} />
  ));

  return ({ shapeProps, isSelected, onChange, onSelect, isSelectMode }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
      if (isSelected && shapeRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      } else if (trRef.current) {
        trRef.current.nodes([]); // Detach Transformer if not selected
      }
    }, [isSelected]);

    return (
      <>
        <WrappedShape
          shapeProps={shapeProps}
          ref={shapeRef}
          isSelectMode={isSelectMode}
          onChange={isSelectMode?onChange:undefined}
          onClick={isSelectMode?onSelect:undefined}
          onTransformEnd={isSelectMode?(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: shapeProps.width ? Math.max(5, node.width() * scaleX) : undefined,
              height: shapeProps.height ? Math.max(5, node.height() * scaleY) : undefined,
              radius: shapeProps.radius ? Math.max(5, node.radius() * scaleX) : undefined,
              rotation: node.rotation(),
            });
          }: undefined}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            flipEnabled={false}
            rotateEnabled={shapeProps.type !== "circle"} // Disable rotation for circles
            anchorCornerRadius={5} // Allow only corner anchors
            boundBoxFunc={(oldBox, newBox) => {
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  };
};
export default withTransformer;