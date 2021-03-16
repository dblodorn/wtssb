import {
  MathUtils,
  Box3,
  Vector3
} from "three";

export default function({model, x, y, z, scale, speed, name}) {
  const radiansPerSecond = MathUtils.degToRad(30);
  x = parseFloat(x)
  y = parseFloat(y)
  z = parseFloat(z)
  scale = parseFloat(scale)
  speed = parseFloat(speed)
  
  
  console.log({x, y, z, scale, speed})
  // console.log(model.name, model.children[0].position)

  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3()).length();

  console.log(size)
  
  const children = model.children[0]
  children.position.set(0,0,0)
  children.scale.set(scale, scale, scale) 

  model.position.set(x || 0, y || 0, z || 0);
  model.name = name || 'ball'
  
  model.tick = () => {
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return model;
}

