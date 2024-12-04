import Shapes from "../shapes/Shapes";
import TOOLS from "../Tools/Tools"

export function isShape(tool) {
  return Object.values(Shapes).includes(tool);
}
export function isDrawingTool(tool) {
  return (tool==TOOLS.PENCIL||tool==TOOLS.ERASER);
}

export function generateShapeId(userIdentifier = "user") {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).substring(2, 8);
  return `${userIdentifier}_${timestamp}_${randomValue}`;
}

export function generateRoomId() {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).substring(2, 8);
  return `Room_${timestamp}_${randomValue}`;
}