import {
  MathUtils,
  Box3,
  Vector3,
  AnimationMixer
} from "three";

export default function({gltf, x, y, z, scale, speed, name}) {
  const radiansPerSecond = MathUtils.degToRad(30);
  
  const model = gltf.scene || gltf.scenes[0];
  const clip = gltf.animations[0];

  x = parseFloat(x)
  y = parseFloat(y)
  z = parseFloat(z)
  scale = parseFloat(scale)
  speed = parseFloat(speed)
  
  model.scale.set(scale, scale, scale)

  model.position.set(x, y, z);
  model.name = name || 'ball'

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.tick = (delta) => {
    mixer.update(delta * 20);
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return model;
}

