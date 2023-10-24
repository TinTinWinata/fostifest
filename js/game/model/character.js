import { isCollideCollider } from '../utils/collision-helper.js';
import { isDialogOpen } from '../utils/dialog-helper.js';
import ctx, {
  CHARACTER_SPEED,
  MOVEMENT_DOWN,
  MOVEMENT_LEFT,
  MOVEMENT_LIST,
  MOVEMENT_RIGHT,
  MOVEMENT_RUN,
  MOVEMENT_UP,
  RUN_CHARACTER_SPEED,
  canvas,
  keys,
  moveable,
} from '../utils/setting.js';
import { Trigger } from './trigger.js';

export class Character {
  constructor(sprite, moveMoveable) {
    this.sprite = sprite; // The character's sprite image.
    this.spriteIdx = 0; // Index for sprite animation.
    this.totalDivided = 4; // Number of divisions in the sprite image.
    this.w = sprite.width / this.totalDivided; // Width of a sprite frame.
    this.h = sprite.height / this.totalDivided; // Height of a sprite frame.
    this.speed = CHARACTER_SPEED; // Character's movement speed.
    this.offsetCheck = 1;
    this.moveMoveable = moveMoveable; // Boolean to indicate whether the character can move moveable object like foreground or background
    this.x = canvas.width / 2 - this.w / 2; // Initial X-coordinate.
    this.y = canvas.height / 2 - this.h / 2; // Initial Y-coordinate.
    this.facing = MOVEMENT_DOWN; // Initial facing direction.
    this.moving = false; // Flag to track if the character is moving.
    this.spriteSpeed = 10; // Speed of sprite animation.
    this.tempSpriteSpeed = 0; // Temporary counter for sprite animation.
  }

  // Get the position and dimensions of the character's collision collider.
  getColliderPosition() {
    const resize = 0.5;
    const marginTop = 0.2;
    const x = this.x + (this.w * resize) / 2;
    const y = this.y + (this.h * resize) / 2 + this.h * marginTop;
    const w = this.w * resize;
    const h = this.h * resize;
    return { x, y, w, h };
  }

  // Check if the character's collision collider collides with an obstacle.
  isCollideCollider(e) {
    const marginBottom = 0.1;
    const { x, y, w, h } = this.getColliderPosition();
    const collideSize = 1;
    if (this.x + this.speed >= canvas.width || this.y - this.speed <= 0)
      return false;
    switch (e) {
      case MOVEMENT_LEFT:
        return isCollideCollider(x - this.speed, y, collideSize, h);
      case MOVEMENT_UP:
        return isCollideCollider(x, y - this.speed, w, collideSize);
      case MOVEMENT_DOWN:
        return isCollideCollider(
          x,
          y + this.speed + h + h * marginBottom,
          h,
          collideSize
        );
      case MOVEMENT_RIGHT:
        return isCollideCollider(x + this.speed + w, y, collideSize, h);
    }
    return true;
  }

  // Move the character by a specified increment.
  move(incX, incY) {
    this.moving = true;
    if (this.moveMoveable) {
      moveable.forEach((moveable) => {
        moveable.move(incX, incY);
      });
    }
  }

  // Check and handle character movement based on the input direction.
  checkMove(e) {
    this.facing = e;
    switch (e) {
      case MOVEMENT_LEFT:
        if (!this.isCollideCollider(e)) this.move(-this.speed, 0);
        return;
      case MOVEMENT_RIGHT:
        if (!this.isCollideCollider(e)) this.move(this.speed, 0);
        return;
      case MOVEMENT_UP:
        if (!this.isCollideCollider(e)) this.move(0, -this.speed);
        return;
      case MOVEMENT_DOWN:
        if (!this.isCollideCollider(e)) this.move(0, this.speed);
        return;
    }
    this.moving = false;
  }

  // Logic for sprite animation and character speed.
  logic() {
    this.tempSpriteSpeed += 1;
    if (this.tempSpriteSpeed >= this.spriteSpeed) {
      this.spriteIdx += 1;
      this.tempSpriteSpeed = 0;
    }

    // Checking movement
    if (!isDialogOpen && !Trigger.active)
      MOVEMENT_LIST.forEach((movementKey) => {
        if (keys[movementKey]) {
          this.checkMove(movementKey);
        }
      });

    if (keys[MOVEMENT_RUN] === true) {
      this.speed = RUN_CHARACTER_SPEED;
    } else {
      this.speed = CHARACTER_SPEED;
    }
  }

  // Calculate the Y position in the sprite image based on the character's facing direction.
  getSourceYPosition() {
    switch (this.facing) {
      case MOVEMENT_UP:
        return 3 * this.h;
      case MOVEMENT_LEFT:
        return 1 * this.h;
      case MOVEMENT_RIGHT:
        return 2 * this.h;
      case MOVEMENT_DOWN:
        return 0 * this.h;
    }
  }

  // Determine the source position in the sprite image for rendering.
  getSourcePosition() {
    if (this.moving) {
      this.spriteIdx %= 4;
      return { x: this.spriteIdx * this.w, y: this.getSourceYPosition() };
    } else {
      return { x: 0, y: this.getSourceYPosition() };
    }
  }

  // Render the character on the canvas.
  render() {
    this.logic();
    const { x, y } = this.getSourcePosition();
    ctx.drawImage(
      this.sprite,
      x,
      y,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
