import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import state from './../../state'

export default async function (loop) {
  const loader = new GLTFLoader();
  loader.crossOrigin = true;

  const balls = state.api

  const [touchModel, synesthesiaModel, sightModel, hearingModel, smellModel, tasteModel] = await Promise.all([
    loader.loadAsync(balls.ball_1.model),
    loader.loadAsync(balls.ball_2.model),
    loader.loadAsync(balls.ball_3.model),
    loader.loadAsync(balls.ball_4.model),
    loader.loadAsync(balls.ball_5.model),
    loader.loadAsync(balls.ball_6.model),
  ])

  return {
    touchModel,
    synesthesiaModel,
    sightModel,
    hearingModel,
    smellModel,
    tasteModel
  };
}
