import { data } from '../data/data.js';
import { debug } from './debug-helper.js';
import ctx, { collideMap, offsetX } from './setting.js';

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
  collideMap.forEach((collide) => {
    // console.log(collide.x, collide.y);
    ctx.fillStyle = 'red';
    ctx.fillRect(
      collide.x + offsetX,
      collide.y + offsetX,
      collide.w,
      collide.h
    );
  });
};

export function isCollide(x, y, w, h) {
  debug(x, y, w, h);
  if (collideMap.length === 0) initiateCollide();
  for (let i = 0; i < collideMap.length; i++) {
    const collide = collideMap[i];
    if (
      x + w >= collide.x &&
      x <= collide.x + collide.w &&
      y + h >= collide.y &&
      y <= collide.y + collide.h
    )
      return true;
  }
}
