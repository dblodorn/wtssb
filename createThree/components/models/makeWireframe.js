import {
  WireframeGeometry,
  LineBasicMaterial,
  LineSegments
} from "three";

import gsap from 'gsap';

export const click = (model, state) => {
  console.log(model.scale.x)
  const currentScale = model.scale.x
  let newScale;
  if (state === 'open') {
    model.traverse(function(child) {
      if (child.isMesh) {
        child.children[0].visible = true
        child.material.visible = false
        newScale = currentScale * 20
      }
    });
  } else if (state === 'close') {
    model.traverse(function(child) {
      if (child.isMesh) {
        child.material.visible = true
        child.children[0].visible = false
        newScale = currentScale / 20
      }
    });
  }
  gsap.to(model.scale, 5, {
    x: newScale,
    y: newScale,
    z: newScale,
    ease: 'expo.out',
  })
}

export const hoverIn = (model) => {
  // const currentScale = model.scale.x
  // const newScale = currentScale * 1.5;
  model.traverse(function(child) {
    if (child.isMesh) {
      child.children[0].visible = true
      child.material.visible = false
    }
  });
  /*
  gsap.to(model.scale, 0.5, {
    x: newScale,
    y: newScale,
    z: newScale,
  })
  */
}

export const hoverOut = (model) => {
  // const currentScale = model.scale.x
  // const newScale = currentScale / 1.5;
  model.traverse(function(child) {
    if (child.isMesh) {
      child.children[0].visible = false
      child.material.visible = true
    }
  });
}
