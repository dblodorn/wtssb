import { World } from "./World"

let world;

export async function startWorld ({container, data, onLoad, ballFunction, mouseOverFunction, mouseOutFunction, animationStart, animationDone, loadedCallback}) {
  
  world = new World({
    container: container, 
    data: data,
    onLoad: onLoad,
    ballFunction: ballFunction,  
    mouseOverFunction:  mouseOverFunction,  
    mouseOutFunction: mouseOutFunction,
    loadedCallback: loadedCallback,
    animationStart: animationStart, 
    animationDone: animationDone,
  });
  
  await world.init();
  world.start();
}

export const clearWorld = () => {
  world.stop();
}

export const enterWorld = () => {
  world.enterWorld();
}

export const closeFunction = (scene) => {
  world.closeHandler(scene);
}

export const cameraHandler = (slide) => {
  world.cameraHandler(slide);
}
