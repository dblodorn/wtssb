import state from '../state'
import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, interactionManager, updatables) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.interactionManager = interactionManager;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.interactionManager.update();
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
