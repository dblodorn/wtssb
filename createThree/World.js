
import { InteractionManager } from 'three.interactive';
import { Box3, Vector3 } from 'three';
import gsap from 'gsap';

import state from './state'
import loadBalls from './components/models/loadBalls';
import loadModel from './components/models/loadModel';
import setupBall from './components/models/setupBall';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createVignette } from './components/vignette'

import { createPointLights } from './components/lights/pointLights';
import { createAmbientLights } from './components/lights/ambientLights';
import { createDirectionalLights } from './components/lights/directionalLights';
import { createHemisphereLights } from './components/lights/hemisphereLights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';

let camera;
let renderer;
let scene;
let loop;
let background;
let interactionManager;
let balls;

class World {
  
  constructor(container) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    background = createVignette(container);
    loop = new Loop(camera, scene, renderer);
    
    interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    this.cameraHandler = this.cameraHandler.bind(this);
    this.motionHandler = this.motionHandler.bind(this);

    container.append(renderer.domElement);
  
    const pointLight = createPointLights();
    const ambientLight = createAmbientLights();
    const directionalLight = createDirectionalLights();
    const leftLight = createDirectionalLights();
    const bottomLight = createDirectionalLights();
    const hemisphereLight = createHemisphereLights();

    leftLight.position.set(0, 0, -20);
    bottomLight.position.set(0, -10, -10);

    loop.updatables.push(background);

    camera.add(directionalLight, pointLight, leftLight, bottomLight, hemisphereLight);
    scene.add(ambientLight, camera, background)

    const resizer = new Resizer(container, camera, renderer);
  }

  motionHandler(object, speed) {
    state.clicks = object.name
    gsap.to(camera.position, speed || 2, {
      x: object.position.x,
      y: object.position.y,
      z: 5 + object.position.z,
      ease: 'expo.out',
    })
  }

  cameraHandler() {
    if (state.currentSlide === 1) {
      this.motionHandler(balls.ball1, 7)
    } else if (state.currentSlide === 2) {
      this.motionHandler(balls.ball2, 6)
    } else if (state.currentSlide === 3) {
      this.motionHandler(balls.ball3, 4)
    } else if (state.currentSlide === 4) {
      this.motionHandler(balls.ball4, 5)
    } else if (state.currentSlide === 5) {
      this.motionHandler(balls.ball5)
    } else if (state.currentSlide === 6) {
      this.motionHandler(balls.ball6)
    }
  }

  nextHandler() {
    state.clicks = state.clicks + 1
    if (state.currentSlide < state.slideCount) {
      state.currentSlide = state.currentSlide + 1
      this.cameraHandler()
    }
  }

  prevHandler() {
    state.clicks = state.clicks + 1
    if (state.currentSlide > 1) {
      state.currentSlide = state.currentSlide - 1
      this.cameraHandler()
    }
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    console.log('stop');
    loop.stop();
    renderer.dispose();
  }

  async init() {
    const models = await loadBalls();

    balls = {
      ball1: setupBall({model: models.touchModel, x: 0, y: 10, z: -80, speed: 0.01, name: 'touch'}),
      ball2: setupBall({model: models.synesthesiaModel, x: 68.4, y: 10, z: -40.3, speed: 0.015, name: 'synesthesia'}),
      ball3: setupBall({model: models.sightModel, x: -69.7, y: 10, z: -40.5, speed: 0.02, name: 'sight'}),
      ball4: setupBall({model: models.hearingModel, x: -69.5, y: 10, z: -39.3, speed: 0.015, name: 'hearing'}),
      ball5: setupBall({model: models.smellModel, x: 0, y: 10, z: 80, speed: 0.009, name: 'smell'}),
      ball6: setupBall({model: models.tasteModel, x: 68.4, y: 10, z: 39.2, speed: 0.003, name: 'taste'}),
    }

    for (const [name, object] of Object.entries(balls)) {
      console.log(object)
      object.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log(`${name} was clicked`);
      });
      interactionManager.add(object);
      loop.updatables.push(object)
      scene.add(object);
    }

    setTimeout(() => {
      this.motionHandler(balls.ball1, 5)
    }, 2000)
  }
}

export { World }
