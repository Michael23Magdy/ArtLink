import Shapes from "../shapes/Shapes";

export function isShape(tool) {
  return Object.values(Shapes).includes(tool);
}

export function generateShapeId(userIdentifier = "user") {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).substring(2, 8);
  return `${userIdentifier}_${timestamp}_${randomValue}`;
}