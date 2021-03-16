import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";
import state from './../../state'

export default async function () {
  const loader = new GLTFLoader();
  loader.crossOrigin = true;

  console.log('BALLS:', state.api)
  const balls = state.api

  const [touchData, synesthesiaData, sightData, hearingData, smellData, tasteData] = await Promise.all([
    loader.loadAsync(balls.ball_1.model),
    loader.loadAsync(balls.ball_2.model),
    loader.loadAsync(balls.ball_3.model),
    loader.loadAsync(balls.ball_4.model),
    loader.loadAsync(balls.ball_5.model),
    loader.loadAsync(balls.ball_6.model),
  ])
  
  const touchModel = setupModel(touchData).scene;
  const synesthesiaModel = setupModel(synesthesiaData).scene;
  const sightModel = setupModel(sightData).scene;
  const hearingModel = setupModel(hearingData).scene;
  const smellModel = setupModel(smellData).scene;
  const tasteModel = setupModel(tasteData).scene;

  return {
    touchModel,
    synesthesiaModel,
    sightModel,
    hearingModel,
    smellModel,
    tasteModel
  };
}
