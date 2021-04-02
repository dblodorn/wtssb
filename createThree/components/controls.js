import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  
  // controls.minDistance = -30
  // controls.maxDistance = 10000
  controls.enableRotate = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  controls.tick = (delta) => {
    controls.update();
  }

  return controls;
}

export { createControls }
