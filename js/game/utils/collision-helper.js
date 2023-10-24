import { data } from '../data/data.js';
import { debug } from './debug-helper.js';
import { collideMap, moveable } from './setting.js';

// Initialize the collision map from the game data.
export const initiateCollide = () => {
  const collisions = data.layers[2]; // Assuming collision data is in the third layer (index 2).
  const map = [];

  for (let i = 0; i < collisions.data.length; i += collisions.width) {
    map.push(collisions.data.slice(i, collisions.width + i));
  }

  map.forEach((mapArr, y) => {
    mapArr.forEach((mapVal, x) => {
      if (mapVal !== 0) {
        // If the map value is not 0, it represents a collision.
        // Add the collision information to the 'collideMap' array.
        collideMap.push({ x: x * 32, y: y * 32, w: 32, h: 32 });
      }
    });
  });
};

// Draw collision rectangles for debugging purposes.
export const drawCollisions = () => {
  const bg = moveable[0]; // Assuming the first movable object represents the background.
  collideMap.forEach((collide) => {
    debug(collide.x + bg.x, collide.y + bg.y, collide.w, collide.h);
  });
};

// Check if a collider with dimensions (x, y, w, h) collides with any collision object.
export function isCollideCollider(x, y, w, h) {
  const bg = moveable[0]; // Assuming the first movable object represents the background.

  // If the 'collideMap' is empty, initialize it by calling 'initiateCollide'.
  if (collideMap.length === 0) {
    initiateCollide();
  }

  for (let i = 0; i < collideMap.length; i++) {
    const collide = collideMap[i];
    if (
      x + w >= collide.x + bg.x &&
      x <= collide.x + bg.x + collide.w &&
      y + h >= collide.y + bg.y &&
      y <= collide.y + collide.h + bg.y
    ) {
      // Collision detected.
      return true;
    }
  }

  // No collision detected.
  return false;
}
