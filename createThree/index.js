import { World } from "./World"

let world;

export async function startWorld ({container, data, onLoad, ball1, ball2, ball3, ball4, ball5, ball6, loadedCallback}) {
  world = new World({container: container, data: data, onLoad: onLoad, ball1: ball1, ball2: ball2, ball3: ball3, ball4: ball4, ball5: ball5, ball6: ball6, loadedCallback: loadedCallback});
  await world.init();
  world.start();
}

export const clearWorld = () => {
  world.stop();
}

export const cameraHandler = (slide) => {
  world.cameraHandler(slide);
}
