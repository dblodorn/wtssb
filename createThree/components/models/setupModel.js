import { AnimationMixer } from 'three';

function setupModel(gltf) {
  const model = gltf.scene || gltf.scenes[0];
  const clips = gltf.animations;
  
  /*
  const mixer = new AnimationMixer(gltf.scene);
  const action = mixer.clipAction(clip);
  action.setEffectiveTimeScale(1);
  action.play();
  /*
  model.tick = (delta) => {
    mixer.update(delta);
  }
  */
  return {
    model,
    clips
  };
}

export { setupModel };
