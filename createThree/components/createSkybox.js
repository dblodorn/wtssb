import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  BackSide
} from "three";

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

  skybox.position.set(-120, -120, -120);
  skybox.rotation.set(0, 0, 0);

  return skybox;
}
