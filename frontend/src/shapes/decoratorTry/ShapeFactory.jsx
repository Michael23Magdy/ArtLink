import { CircleShape, EllipseShape, LineShape, PolygonShape, RectangleShape, TriangleShape } from "./ShapeComponents";
import Shapes from "../Shapes";
import withTransformer from "./WithTransformer";

const RectangleWithTransformer = withTransformer(RectangleShape);
const CircleWithTransformer = withTransformer(CircleShape);
const EllipseWithTransformer = withTransformer(EllipseShape);
const TriangleWithTransformer = withTransformer(TriangleShape);
const LineWithTransformer = withTransformer(LineShape);
const PolygonWithTransformer = withTransformer(PolygonShape);

const ShapeFactory = (type,id, props) => {
    switch (type) {
      case Shapes.RECTANGLE:
        return <RectangleWithTransformer key={id} {...props} />;
      case Shapes.CIRCLE:
        return <CircleWithTransformer key={id} {...props} />;
      case Shapes.ELLIPSE:
        return <EllipseWithTransformer key={id} {...props} />;
      case Shapes.TRIANGLE:
        return <TriangleWithTransformer key={id} {...props} />;
      case Shapes.LINE:
        return <LineWithTransformer key={id} {...props} />;
      case Shapes.POLYGON:
        return <PolygonWithTransformer key={id} {...props} />;
      default: null
        // return <Line id={id} {...attributes} draggable={drag} />; // make a component for shapes drown by pencil
    }
  };
export default ShapeFactory;