
import { InteractionManager } from 'three.interactive';
import { Box3, Vector3 } from 'three';
import gsap from 'gsap';

import state from './state'
import loadBalls from './components/models/loadBalls';
import setupBall from './components/models/setupBall';
import createSkybox from './components/createSkybox'

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
let ball1Function;
let ball2Function;
let ball3Function;
let ball4Function;
let ball5Function;
let ball6Function;
let skyBox;
class World {
  
  constructor({container, data, ball1, ball2, ball3, ball4, ball5, ball6}) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    background = createVignette(container);
    loop = new Loop(camera, scene, renderer);
    state.api = data
    
    interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    this.cameraHandler = this.cameraHandler.bind(this);
    this.motionHandler = this.motionHandler.bind(this);

    ball1Function = ball1
    ball2Function = ball2
    ball3Function = ball3
    ball4Function = ball4
    ball5Function = ball5
    ball6Function = ball6

    this.ball1Handler = this.ball1Handler.bind(this);
    this.ball2Handler = this.ball2Handler.bind(this);
    this.ball3Handler = this.ball3Handler.bind(this);
    this.ball4Handler = this.ball4Handler.bind(this);
    this.ball5Handler = this.ball5Handler.bind(this);
    this.ball6Handler = this.ball6Handler.bind(this);

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

    camera.add(directionalLight, pointLight, leftLight, bottomLight );
    scene.add(ambientLight, camera, background, hemisphereLight)

    const resizer = new Resizer(container, camera, renderer);
  }

  motionHandler(object, speed) {
    gsap.to(camera.position, speed || 2, {
      x: object.position.x,
      y: object.position.y,
      z: 6 + object.position.z,
      ease: 'expo.out',
    })
  }

  cameraHandler(slide) {
    if (slide === 1) {
      this.motionHandler(balls.ball1, 7)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_1})
      scene.add(skyBox)
    } else if (slide === 2) {
      this.motionHandler(balls.ball2, 6)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_2})
      scene.add(skyBox)
    } else if (slide === 3) {
      this.motionHandler(balls.ball3, 4)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_3})
      scene.add(skyBox)
    } else if (slide === 4) {
      this.motionHandler(balls.ball4, 5)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_4})
      scene.add(skyBox)
    } else if (slide === 5) {
      this.motionHandler(balls.ball5)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_5})
      scene.add(skyBox)
    } else if (slide === 6) {
      this.motionHandler(balls.ball6)
      scene.remove(skyBox)
      skyBox = new createSkybox({images: state.api.scene_6})
      scene.add(skyBox)
    }
  }

  nextHandler() {
    state.clicks = state.clicks + 1
    console.log('next', state.currentSlide)
    if (state.currentSlide < state.slideCount) {
      state.currentSlide = state.currentSlide + 1
    } else if (state.currentSlide === 6) {
      state.currentSlide = 1
    }
    this.cameraHandler(state.currentSlide)
  }

  prevHandler() {
    state.clicks = state.clicks + 1
    console.log('prev')
    if (state.currentSlide > 1) {
      state.currentSlide = state.currentSlide - 1
      console.log('prev', state.currentSlide)
    } else if (state.currentSlide === 1) {
      state.currentSlide = 6
    }
    this.cameraHandler(state.currentSlide)
  }

  /* BALL HANDLERS */
  ball1Handler(arg) {ball1Function()}
  ball2Handler(arg) {ball2Function()}
  ball3Handler(arg) {ball3Function()}
  ball4Handler(arg) {ball4Function()}
  ball5Handler(arg) {ball5Function()}
  ball6Handler(arg) {ball6Function()}
  
  /* RENDER */
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
    renderer.dispose();
  }

  async init() {
    const models = await loadBalls(loop);
    
    skyBox = new createSkybox({images: state.api.scene_2})
    scene.add(skyBox)
    
    balls = {
      ball1: setupBall({
        gltf: models.touchModel,
        ...state.api.model_config_1,
        name: state.api.ball_1.name
      }),
      ball2: setupBall({
        gltf: models.synesthesiaModel, 
        ...state.api.model_config_2,
        name: state.api.ball_2.name
      }),
      ball3: setupBall({
        gltf: models.sightModel,
        ...state.api.model_config_3,
        name: state.api.ball_3.name
      }),
      ball4: setupBall({
        gltf: models.hearingModel,
        ...state.api.model_config_4,
        name: state.api.ball_4.name
      }),
      ball5: setupBall({
        gltf: models.smellModel,
        ...state.api.model_config_5,
        name: state.api.ball_5.name
      }),
      ball6: setupBall({
        gltf: models.tasteModel,
        ...state.api.model_config_5,
        name: state.api.ball_6.name
      }),
    }

    for (const [name, object] of Object.entries(balls)) {
      interactionManager.add(object);
      loop.updatables.push(object);
      scene.add(object);
    }

    balls.ball1.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball1Handler();
    });

    balls.ball2.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball2Handler();
    });

    balls.ball3.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball3Handler();
    });

    balls.ball4.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball4Handler();
    });

    balls.ball5.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball5Handler();
    });

    balls.ball6.addEventListener('click', (event) => {
      event.stopPropagation();
      this.ball6Handler();
    });

    setTimeout(() => {
      this.cameraHandler(1)
    }, 50)
  }
}

export { World }
