import state from '../state'
import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, updatables) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    // this.controls = new OrbitControls(camera, renderer.domElement);
  }

  start() {
    // this.controls.enableRotate = true
    // this.controls.autoRotate = true
    // this.controls.minDistance = -30
    // this.controls.maxDistance = 10000
    // this.controls.autoRotateSpeed = 0.5
    this.renderer.setAnimationLoop(() => {
      this.tick();
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
