import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableRotate = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  controls.tick = (delta) => {
    controls.update();
  }

  return controls;
}

export { createControls }
