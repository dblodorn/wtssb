import { World } from "./World"

let world;

export async function startWorld ({container, data, ball1, ball2, ball3, ball4, ball5, ball6}) {
  world = new World({container: container, data: data, ball1: ball1, ball2: ball2, ball3: ball3, ball4: ball4, ball5: ball5, ball6: ball6});
  await world.init();
  world.start();
}

export const clearWorld = () => {
  world.stop();
}

export const nextHandler = () => {
  world.nextHandler();
}

export const prevHandler = () => {
  world.prevHandler();
}
