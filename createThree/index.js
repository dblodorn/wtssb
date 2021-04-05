import { World } from "./World"

let world;

export async function startWorld ({container, data, onLoad, ballFunction, loadedCallback}) {
  world = new World({container: container, data: data, onLoad: onLoad, ballFunction: ballFunction, loadedCallback: loadedCallback});
  await world.init();
  world.start();
}

export const clearWorld = () => {
  world.stop();
}

export const cameraHandler = (slide) => {
  world.cameraHandler(slide);
}
