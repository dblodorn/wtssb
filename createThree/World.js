
import { InteractionManager } from 'three.interactive';
import gsap from 'gsap';

import state from './state'
import loadBalls from './components/models/loadBalls';
import setupBall from './components/models/setupBall';
import * as wireframe from './components/models/makeWireframe';
import createSkybox from './components/createSkybox';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createControls } from './components/controls';

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
let clickHandler;
let mouseOverHandler;
let mouseOutHandler;
let onLoadFunction;
let loadedFunction;
let skyBox;

let zoomed = false;
class World {
  constructor({container, data, onLoad, ballFunction, mouseOverFunction, mouseOutFunction,  loadedCallback}) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    controls = createControls(camera, renderer);
    interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );
    loop = new Loop(camera, scene, renderer, interactionManager);
    state.api = data

    this.cameraHandler = this.cameraHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.motionHandler = this.motionHandler.bind(this);
    this.zoomOutHandler = this.zoomOutHandler.bind(this);

    clickHandler = ballFunction
    mouseOutHandler = mouseOutFunction
    mouseOverHandler = mouseOverFunction
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
    gsap.to(camera.position, speed / 5, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z - 40,
      ease: 'expo.out',
    })
    gsap.to(controls.target, speed, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
      ease: 'expo.out',
    })
  }

  zoomOutHandler(object) {
    console.log('zoom', object)
    gsap.to(camera.position, 2, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z + 140,
      ease: 'expo.out',
    })
    gsap.to(controls.target, 2, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
      ease: 'expo.out',
    })
  }

  cameraHandler(slide) {
    console.log(slide)
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
    } else if (slide === 'center') {
      gsap.to(controls.target, 5, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'expo.out',
      })
      gsap.to(camera.position, 5, {
        x: 0,
        y: 200,
        z: -180,
        ease: 'expo.out',
      })
    }
  }

  closeHandler(scene) {
    zoomed = false;
    this.cameraHandler('center')
    switch (scene) {
      case 'Touch':
        wireframe.click(balls.ball1, 'close')
        break;
      case 'Synesthesia':
        wireframe.click(balls.ball2, 'close')
        break;
      case 'Sight':
        wireframe.click(balls.ball3, 'close')
        break;
      case 'Hearing':
        wireframe.click(balls.ball4, 'close')
        break;
      case 'Smell':
        wireframe.click(balls.ball5, 'close')
        break;
      case 'Taste':
        wireframe.click(balls.ball6, 'close')
        break;
      default:
        console.log(`NO SCENE`);
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

  enterWorld() {
    /*
    gsap.to(controls.target, 15, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'expo.out',
    })
    gsap.to(camera.position, 15, {
      x: 0,
      y: 200,
      z: -200,
      ease: 'expo.out',
    })
    */
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
        name: 'Touch'
      }),
      ball2: setupBall({
        wireframe: false,
        gltf: models.synesthesiaModel, 
        ...state.api.model_config_2,
        name: 'Synesthesia'
      }),
      ball3: setupBall({
        wireframe: false,
        gltf: models.sightModel,
        ...state.api.model_config_3,
        name: 'Sight'
      }),
      ball4: setupBall({
        wireframe: false,
        gltf: models.hearingModel,
        ...state.api.model_config_4,
        name: 'Hearing'
      }),
      ball5: setupBall({
        wireframe: false,
        gltf: models.smellModel,
        ...state.api.model_config_5,
        name: 'Smell'
      }),
      ball6: setupBall({
        wireframe: false,
        gltf: models.tasteModel,
        ...state.api.model_config_6,
        name: 'Taste'
      }),
    }
    
    // ADD BALLS
    Object.entries(balls).forEach(([name, object], index) => {
      interactionManager.add(object);
      loop.updatables.push(object);
      scene.add(object);
      // INTERACTION:
      object.addEventListener('click', (event) => {
        event.stopPropagation();
        clickHandler(object.name, index);
        wireframe.click(object, 'open')
        zoomed = true;
      });
      object.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
        if (!zoomed) {
          mouseOverHandler(object.name)
          wireframe.hoverIn(object)
        }
      });
      object.addEventListener('mouseout', (event) => {
        event.stopPropagation();
        document.body.style.cursor = "default";
        if (!zoomed) {
          mouseOutHandler(object.name)
          wireframe.hoverOut(object)
        }
      });
      console.log(`OBJECT NAME: ${object.name} LOADED`);
    });
  }
}

export { World }
