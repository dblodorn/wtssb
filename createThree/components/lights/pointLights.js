import { PointLight } from "three";

function createPointLights() {
  const light = new PointLight(0xffffcc, 20, 500);
  light.position.set(0, 30, 220);
  return light;
}

export { createPointLights };
