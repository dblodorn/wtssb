import {
  MathUtils,
  WireframeGeometry,
  LineBasicMaterial,
  LineSegments,
  AnimationMixer,
} from "three";

export default function({wireframe, gltf, x, y, z, scale, speed, animation_speed, name}) {
  
  const radiansPerSecond = MathUtils.degToRad(30);
  
  const model = gltf.scene || gltf.scenes[0];
  const clip = gltf.animations[0];

  x = parseFloat(x)
  y = parseFloat(y)
  z = parseFloat(z)
  scale = parseFloat(scale)
  speed = parseFloat(speed)
  animation_speed = parseFloat(animation_speed)
  
  model.scale.set(scale, scale, scale)

  model.position.set(x, y, z);
  model.name = name

  const toggleWireframe = (state) => {
    if (state === true) {
      model.traverse(function(child) {
        if (child.isMesh) {
          const wireframeGeometry = new WireframeGeometry(child.geometry);
          const wireframeMaterial = new LineBasicMaterial({color: 0x000000});
          const wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
          wireframe.name = 'wireframe';
          child.add(wireframe);
        }
      });
    }
  }

  toggleWireframe(wireframe)

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.tick = (delta) => {
    mixer.update(delta * animation_speed);
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return model;
}
