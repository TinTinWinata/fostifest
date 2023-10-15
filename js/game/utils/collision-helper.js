import { data } from '../data/data.js';
import { debug } from './debug-helper.js';
import { collideMap, moveable } from './setting.js';

export const initiateCollide = () => {
  const collisions = data.layers[1];
  const map = [];
  for (let i = 0; i < collisions.data.length; i += collisions.width) {
    map.push(collisions.data.slice(i, collisions.width + i));
  }

  map.forEach((mapArr, y) => {
    mapArr.forEach((mapVal, x) => {
      if (mapVal !== 0) collideMap.push({ x: x * 32, y: y * 32, w: 32, h: 32 });
    });
  });
};

export const drawCollisions = () => {
  const bg = moveable[0];
  collideMap.forEach((collide) => {
    debug(collide.x + bg.x, collide.y + bg.y, collide.w, collide.h);
  });
};

export function isCollideCollider(x, y, w, h) {
  const bg = moveable[0];
  // debug(x, y, w, h);
  if (collideMap.length === 0) initiateCollide();
  for (let i = 0; i < collideMap.length; i++) {
    const collide = collideMap[i];
    if (
      x + w >= collide.x + bg.x &&
      x <= collide.x + bg.x + collide.w &&
      y + h >= collide.y + bg.y &&
      y <= collide.y + collide.h + bg.y
    )
      return true;
  }
  return false;
}
