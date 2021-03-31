import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import state from './../../state'

export default async function (loop) {
  const loader = new GLTFLoader();
  loader.crossOrigin = true;

  const balls = state.api

  const onLoading = (event, model) => {
    console.log({model: model, loading: event.loaded, total: event.total})
  }

  const [touchModel, synesthesiaModel, sightModel, hearingModel, smellModel, tasteModel] = await Promise.all([
    loader.loadAsync(balls.ball_1.model, (event) => onLoading(event, 'Ball1')).then((result) => {
      console.log('Loaded Ball1', result);
      return result;
    }),
    loader.loadAsync(balls.ball_2.model, (event) => onLoading(event, 'Ball2')).then((result) => {
      console.log('Loaded Ball2', result);
      return result;
    }),
    loader.loadAsync(balls.ball_3.model, (event) => onLoading(event, 'Ball3')).then((result) => {
      console.log('Loaded Ball3', result);
      return result;
    }),
    loader.loadAsync(balls.ball_4.model, (event) => onLoading(event, 'Ball4')).then((result) => {
      console.log('Loaded Ball4', result);
      return result;
    }),
    loader.loadAsync(balls.ball_5.model, (event) => onLoading(event, 'Ball5')).then((result) => {
      console.log('Loaded Ball5', result);
      return result;
    }),
    loader.loadAsync(balls.ball_6.model, (event) => onLoading(event, 'Ball6')).then((result) => {
      console.log('Loaded Ball6', result);
      return result;
    })
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
