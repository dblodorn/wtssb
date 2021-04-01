
import { InteractionManager } from 'three.interactive';
import { Box3, Vector3 } from 'three';
import gsap from 'gsap';

import state from './state'
import loadBalls from './components/models/loadBalls';
import setupBall from './components/models/setupBall';
import createSkybox from './components/createSkybox'

import { createCamera } from './components/camera';
import { createScene } from './components/scene';

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
let interactionManager;
let balls;
let ball1Function;
let ball2Function;
let ball3Function;
let ball4Function;
let ball5Function;
let ball6Function;
let onLoadFunction;
let loadedFunction;
let skyBox;
class World {
  
  constructor({container, data, onLoad, ball1, ball2, ball3, ball4, ball5, ball6, loadedCallback}) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    // background = createVignette(container);
    loop = new Loop(camera, scene, renderer);
    state.api = data
    
    interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    this.cameraHandler = this.cameraHandler.bind(this);
    this.motionHandler = this.motionHandler.bind(this);
    this.zoomOutHandler = this.zoomOutHandler.bind(this);

    ball1Function = ball1
    ball2Function = ball2
    ball3Function = ball3
    ball4Function = ball4
    ball5Function = ball5
    ball6Function = ball6
    onLoadFunction = onLoad
    loadedFunction = loadedCallback

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

    // loop.updatables.push(background);

    camera.add(directionalLight, pointLight, leftLight, bottomLight );
    scene.add(ambientLight, camera, hemisphereLight)

    const resizer = new Resizer(container, camera, renderer);
  }

  motionHandler(object, speed) {
    console.log('motion', object)
    gsap.to(camera.position, speed, {
      x: object.position.x,
      y: object.position.y,
      z: 6 + object.position.z,
      ease: 'expo.out',
    })
  }

  zoomOutHandler(object) {
    console.log('zoom', object)
    gsap.to(camera.position, 10, {
      x: object.position.x - 5,
      y: object.position.y - 5,
      z: object.position.z - 5,
      ease: 'expo.out',
    })
  }

  cameraHandler(slide) {
    if (slide === 1) {
      this.motionHandler(balls.ball1, 7)
    } else if (slide === 2) {
      this.motionHandler(balls.ball2, 6)
    } else if (slide === 3) {
      this.motionHandler(balls.ball3, 4)
    } else if (slide === 4) {
      this.motionHandler(balls.ball4, 5)
    } else if (slide === 5) {
      this.motionHandler(balls.ball5, 5)
    } else if (slide === 6) {
      this.motionHandler(balls.ball6, 5)
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
  ball1Handler() {
    this.zoomOutHandler(balls.ball1)
    ball1Function()
  }
  ball2Handler() {
    this.zoomOutHandler(balls.ball2)
    ball2Function()
  }
  ball3Handler() {
    this.zoomOutHandler(balls.ball3)
    ball3Function()
  }
  ball4Handler() {
    this.zoomOutHandler(balls.ball4)
    ball4Function()
  }
  ball5Handler() {
    this.zoomOutHandler(balls.ball5)
    ball5Function()
  }
  ball6Handler() {
    this.zoomOutHandler(balls.ball6)
    ball6Function()
  }
  
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
    const models = await loadBalls(loop, loadedFunction);

    skyBox = new createSkybox({images: state.api.skybox_bg})
    scene.add(skyBox)
    
    onLoadFunction();

    balls = {
      ball1: setupBall({
        wireframe: false,
        gltf: models.touchModel,
        ...state.api.model_config_1,
        name: state.api.ball_1.name
      }),
      ball2: setupBall({
        wireframe: false,
        gltf: models.synesthesiaModel, 
        ...state.api.model_config_2,
        name: state.api.ball_2.name
      }),
      ball3: setupBall({
        wireframe: false,
        gltf: models.sightModel,
        ...state.api.model_config_3,
        name: state.api.ball_3.name
      }),
      ball4: setupBall({
        wireframe: false,
        gltf: models.hearingModel,
        ...state.api.model_config_4,
        name: state.api.ball_4.name
      }),
      ball5: setupBall({
        wireframe: false,
        gltf: models.smellModel,
        ...state.api.model_config_5,
        name: state.api.ball_5.name
      }),
      ball6: setupBall({
        wireframe: false,
        gltf: models.tasteModel,
        ...state.api.model_config_6,
        name: state.api.ball_6.name
      }),
    }

    for (const [name, object] of Object.entries(balls)) {
      interactionManager.add(object);
      loop.updatables.push(object);
      scene.add(object);
    }

    // CLICK FUNCTIONS
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

    // HOVER FUNCTIONS
    /*
    balls.ball1.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 1 hover')
    });

    balls.ball2.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 2 hover')
    });

    balls.ball3.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 3 hover')
    });

    balls.ball4.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 4 hover')
    });

    balls.ball5.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 5 hover')
    });

    balls.ball6.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      console.log('ball 6 hover')
    });
    */
    setTimeout(() => {
      this.cameraHandler(1)
    }, 50)
  }
}

export { World }
