import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";

export default async function () {
  const loader = new GLTFLoader();
  loader.crossOrigin = true;

  const [touchData, synesthesiaData, sightData, hearingData, smellData, tasteData] = await Promise.all([
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Touch-r1a.gltf'),
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Sythensia-r1a.gltf'),
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Sight-r1a.gltf'),
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Hearing-r1a.gltf'),
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Smell-r1a.gltf'),
    loader.loadAsync('https://media.dmbk.io/fr-models/fr-balls/Taste-r1a.gltf'),
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
