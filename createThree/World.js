
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
let marsBox;
let animationStartHandler;
let animationDoneHandler;

let zoomed = false;
class World {
  constructor({container, data, onLoad, ballFunction, mouseOverFunction, mouseOutFunction, animationStart, animationDone, loadedCallback}) {
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
    this.startAnimation = this.startAnimation.bind(this);
    this.endAnimation = this.endAnimation.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
    this.panSkybox = this.panSkybox.bind(this);

    clickHandler = ballFunction
    mouseOutHandler = mouseOutFunction
    mouseOverHandler = mouseOverFunction
    onLoadFunction = onLoad
    loadedFunction = loadedCallback
    animationStartHandler = animationStart
    animationDoneHandler = animationDone

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

  endAnimation(arg) {
    animationDoneHandler(arg)
    state.animating = false
  }

  startAnimation(arg) {
    animationStartHandler(arg)
    state.animating = true
  }

  motionHandler(object, speed) {
    gsap.to(camera.position, speed / 5, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z - 40,
      ease: 'expo.out',
      onStart: () => this.startAnimation('motionHandler start')
    })
    gsap.to(controls.target, speed / 2, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
      ease: 'expo.out',
      onComplete: () => this.endAnimation('motionHandler end')
    })
  }

  cameraHandler(slide) {
    // console.log('nav', slide)
    if (slide === 'Touch') {
      this.motionHandler(balls.ball1, 6)
    } else if (slide === 'Taste') {
      this.motionHandler(balls.ball6, 6)
    } else if (slide === 'Smell') {
      this.motionHandler(balls.ball5, 6)
    } else if (slide === 'Hearing') {
      this.motionHandler(balls.ball4, 6)
    } else if (slide === 'Sight') {
      this.motionHandler(balls.ball3, 6)
    } else if (slide === 'Synesthesia') {
      this.motionHandler(balls.ball2, 6)
    } else if (slide === 'center') {
      gsap.to(controls.target, 5, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'expo.out',
        onStart: () => this.startAnimation('Center start'),
        onComplete: () => this.endAnimation('Center end')
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
    marsBox.material.forEach(element => {
      gsap.to(element, 2, {
        opacity: 0,
        ease: 'expo.out',
      })
    });
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

  // ADD INTERACTION
  addInteraction() {
    this.endAnimation('intro-end')
    Object.entries(balls).forEach(([name, object], index) => {
      interactionManager.add(object);
      // INTERACTION:
      object.addEventListener('click', (event) => {
        event.stopPropagation();
        clickHandler(object.name, index);
        marsBox.material.forEach(element => {
          gsap.to(element, 2, {
            opacity: 1,
            ease: 'expo.out',
          })
        });
        wireframe.click(object, 'open')
        this.panSkybox(object)
        zoomed = true;
      });
      object.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
        if (!zoomed) {
          wireframe.hoverIn(object)
          mouseOverHandler(object.name)
        }
      });
      object.addEventListener('mouseout', (event) => {
        event.stopPropagation();
        document.body.style.cursor = "default";
        if (!zoomed ) {
          wireframe.hoverOut(object)
          mouseOutHandler(object.name)
        }
      });
    });
  }

  panSkybox(object) {
    const tl = gsap.timeline();
    // console.log(object, 'transition camera')
    tl.to(controls.target, 2, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z - 20
    })
    .to(camera.position, 3, {
      x: object.position.x * -1,
      y: object.position.y * -1,
      z: object.position.z * -1
    }, 0)
    .to(camera.position, 3, {
      x: -25,
      y: -50,
      z: 10
    })
    .to(camera.position, 5, {
      x: 25,
      y: 50,
      z: -10
    })
    .to(camera.position, 2, {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z
    })
  }

  enterWorld() {
    const tl = gsap.timeline();
    tl.to(controls.target, 2, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'expo.out',
      onStart: () => {this.startAnimation('intro start')}
    })
    .to(camera.position, 2, {
      x: 0,
      y: 200,
      z: -200,
      ease: 'expo.out'
    }, 0)
    .to(camera.position, 2, {
      x: balls.ball1.position.x,
      y: balls.ball1.position.y,
      z: balls.ball1.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball1 camera end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball1.position.x,
      y: balls.ball1.position.y,
      z: balls.ball1.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball1 controls end')}
    }, 3)
    .to(camera.position, 2, {
      x: balls.ball2.position.x,
      y: balls.ball2.position.y,
      z: balls.ball2.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball2 camera end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball2.position.x,
      y: balls.ball2.position.y,
      z: balls.ball2.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball2 controls end')}
    }, 6)
    .to(camera.position, 2, {
      x: balls.ball3.position.x,
      y: balls.ball3.position.y,
      z: balls.ball3.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball3 camera end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball3.position.x,
      y: balls.ball3.position.y,
      z: balls.ball3.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball3 controls end')}
    }, 9)
    .to(camera.position, 2, {
      x: balls.ball4.position.x,
      y: balls.ball4.position.y,
      z: balls.ball4.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball4 controls end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball4.position.x,
      y: balls.ball4.position.y,
      z: balls.ball4.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball4 controls end')}
    }, 12)
    .to(camera.position, 2, {
      x: balls.ball5.position.x,
      y: balls.ball5.position.y,
      z: balls.ball5.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball5 camera end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball5.position.x,
      y: balls.ball5.position.y,
      z: balls.ball5.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball5 controls end')}
    }, 15)
    .to(camera.position, 2, {
      x: balls.ball6.position.x,
      y: balls.ball6.position.y,
      z: balls.ball6.position.z - 40,
      ease: 'expo.out',
      onComplete: () => {console.log('ball6 camera end')}
    }, "+=1")
    .to(controls.target, 2, {
      x: balls.ball6.position.x,
      y: balls.ball6.position.y,
      z: balls.ball6.position.z,
      ease: 'expo.out',
      onComplete: () => {console.log('ball6 controls end')}
    }, 18)
    .to(camera.position, 4, {
      x: 0,
      y: 200,
      z: -200,
      ease: 'expo.out',
      onComplete: () => {this.addInteraction()}
    }, "+=1")
    .to(controls.target, 2, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'expo.out'
    }, 21)
    
  }

  async init() {
    const models = await loadBalls(loop, loadedFunction);

    skyBox = new createSkybox({images: state.api.skybox_bg})
    scene.add(skyBox)

    marsBox = new createSkybox({images: state.api.skybox_terrain})
    marsBox.material.forEach(element => {
      element.transparent = true
      element.opacity = 0
    });
    scene.add(marsBox)

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
      scene.add(object);
      loop.updatables.push(object);
    });

    
  }
}

export { World }
