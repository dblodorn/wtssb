import {
  MathUtils,
  Box3,
  Vector3
} from "three";

export default function({model, x, y, z, rotateSpeed, name}) {
  model.name = name || 'ball'
  
  console.log(model.name, model.children[0].position)

  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3()).length();

  console.log(size)
  
  const children = model.children[0]
  children.position.set(0,0,0)
  children.scale.set(.2,.2,.2)

  model.position.set(x || 0, y || 0, z || 0);

  const radiansPerSecond = MathUtils.degToRad(30);
  const speed = rotateSpeed || .001

  model.tick = () => {
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return model;
}

