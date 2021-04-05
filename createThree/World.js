
import { InteractionManager } from 'three.interactive';
import gsap from 'gsap';

import state from './state'
import loadBalls from './components/models/loadBalls';
import setupBall from './components/models/setupBall';
import createSkybox from './components/createSkybox'

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createControls } from './components/controls'

import { createPointLights } from './components/lights/pointLights';
import { createAmbientLights } from './components/lights/ambientLights';
import { createDirectionalLights } from './components/lights/directionalLights';
import { createHemisphereLights } from './components/lights/hemisphereLights';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';

let camera;
let controls;
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
    controls = createControls(camera, renderer);
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

    container.append(renderer.domElement);
  
    const pointLight = createPointLights();
    const ambientLight = createAmbientLights();
    const directionalLight = createDirectionalLights();
    const leftLight = createDirectionalLights();
    const bottomLight = createDirectionalLights();
    const hemisphereLight = createHemisphereLights();

    leftLight.position.set(0, 0, -20);
    bottomLight.position.set(0, -10, -10);

    camera.add(directionalLight, pointLight, leftLight, bottomLight );
    scene.add(ambientLight, camera, hemisphereLight);
    loop.updatables.push(controls);

    const resizer = new Resizer(container, camera, renderer);
  }

  motionHandler(object, speed) {
    console.log('motion', object.name, controls.target, {x: object.position.x,
    y: object.position.y,
    z: object.position.z})
    
    gsap.to(controls.target, speed, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z - 10,
      ease: 'expo.out',
    })
  }

  zoomOutHandler(object) {
    console.log('zoom', object)
    gsap.to(controls.target, 10, {
      x: object.position.x - 15,
      y: object.position.y - 15,
      z: object.position.z - 15,
      ease: 'expo.out',
    })
  }

  cameraHandler(slide) {
    if (slide === 0) {
      this.motionHandler(balls.ball1, 6)
    } else if (slide === 1) {
      this.motionHandler(balls.ball2, 6)
    } else if (slide === 2) {
      this.motionHandler(balls.ball3, 6)
    } else if (slide === 3) {
      this.motionHandler(balls.ball4, 6)
    } else if (slide === 4) {
      this.motionHandler(balls.ball5, 6)
    } else if (slide === 5) {
      this.motionHandler(balls.ball6, 6)
    }
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
        name: 'Ball1'
      }),
      ball2: setupBall({
        wireframe: false,
        gltf: models.synesthesiaModel, 
        ...state.api.model_config_2,
        name: 'Ball2'
      }),
      ball3: setupBall({
        wireframe: false,
        gltf: models.sightModel,
        ...state.api.model_config_3,
        name: 'Ball3'
      }),
      ball4: setupBall({
        wireframe: false,
        gltf: models.hearingModel,
        ...state.api.model_config_4,
        name: 'Ball4'
      }),
      ball5: setupBall({
        wireframe: false,
        gltf: models.smellModel,
        ...state.api.model_config_5,
        name: 'Ball5'
      }),
      ball6: setupBall({
        wireframe: false,
        gltf: models.tasteModel,
        ...state.api.model_config_6,
        name: 'Ball6'
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
      ball1Function()
    });

    balls.ball2.addEventListener('click', (event) => {
      event.stopPropagation();
      ball2Function()
    });

    balls.ball3.addEventListener('click', (event) => {
      event.stopPropagation();
      ball3Function()
    });

    balls.ball4.addEventListener('click', (event) => {
      event.stopPropagation();
      ball4Function()
    });

    balls.ball5.addEventListener('click', (event) => {
      event.stopPropagation();
      ball5Function()
    });

    balls.ball6.addEventListener('click', (event) => {
      event.stopPropagation();
      ball6Function()
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
