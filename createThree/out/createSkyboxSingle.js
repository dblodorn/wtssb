import {
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  BackSide
} from "three";

import state from './../../state'

export default function ({x, y, z, name, materials}) {

  let materialArray = []
  
  const materials = [
    'ft.jpg',
    'bk.jpg',
    'up.jpg',
    'dn.jpg',
    'rt.jpg',
    'lf.jpg'
  ]

  materials.forEach(item => {
    let texture = new TextureLoader().load(`https://media.dmbk.io/skybox-pack/${name}/${item}`);
    materialArray.push(new MeshBasicMaterial( { map: texture }));
  });

  for (let i = 0; i < 6; i++)
    materialArray[i].side = BackSide;

  const skyboxGeo = new BoxGeometry(1600, 1600, 1600);
  const skybox = new Mesh(skyboxGeo, materialArray);

  const rotateSpeed = 0.01;

  if (name) { skybox.name = name }

  skybox.position.set(x || 0, y || 0, z || 0);
  skybox.rotation.set(0, 0, 0);

  const radiansPerSecond = MathUtils.degToRad(30);

  skybox.tick = () => {
    // increase the skybox's rotation each frame
    skybox.rotation.z += radiansPerSecond * rotateSpeed;
    skybox.rotation.x += radiansPerSecond * rotateSpeed;
    skybox.rotation.y += radiansPerSecond * rotateSpeed;
  };

  return skybox;
}
