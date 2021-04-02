import { PerspectiveCamera } from "three";

function createCamera(container) {
  const camera = new PerspectiveCamera(
    75,
    container.innerWidth / container.innerHeight,
    0.05,
    12000
  );
  camera.position.z = 10;
  return camera;
}

export { createCamera };
