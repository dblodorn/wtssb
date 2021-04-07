import {
  WireframeGeometry,
  LineBasicMaterial,
  LineSegments
} from "three";

import gsap from 'gsap';

export default function(model, show) {
  
  click = () => {
    console.log(model.scale.x)
    const currentScale = model.scale.x
    let newScale;
    model.traverse(function(child) {
      if (child.isMesh) {
        if(child.children[0].visible === false) {
          child.children[0].visible = true
          child.material.visible = false
          newScale = currentScale * 20
        } else {
          child.material.visible = true
          child.children[0].visible = false
          newScale = currentScale / 20
        }
      }
    });
    gsap.to(model.scale, 5, {
      x: newScale,
      y: newScale,
      z: newScale,
      ease: 'expo.out',
    })
  }
  
  hover = () => {
    console.log('hover')
  }
  
  
}
