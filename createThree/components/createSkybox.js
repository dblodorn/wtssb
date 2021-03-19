import {
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  BackSide
} from "three";

import state from './../state'

export default function ({images}) {

  let materialArray = []
  
  images.forEach(item => {
    let texture = new TextureLoader().load(item);
    materialArray.push(new MeshBasicMaterial( { map: texture }));
  });

  for (let i = 0; i < 6; i++)
    materialArray[i].side = BackSide;

  const skyboxGeo = new BoxGeometry(1600, 1600, 1600);
  const skybox = new Mesh(skyboxGeo, materialArray);
  skybox.name = 'SkyBox'
  const rotateSpeed = 0.01;

  skybox.position.set(-120, -120, -120);
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
