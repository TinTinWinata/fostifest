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
    this.sprite = sprite; // Eiger Loading Purposes
    this.spriteIdx = 0;
    this.totalDivided = 4;
    this.w = sprite.width / this.totalDivided;
    this.h = sprite.height / this.totalDivided;
    this.speed = CHARACTER_SPEED;
    this.offsetCheck = 1;
    this.moveMoveable = moveMoveable;
    this.x = canvas.width / 2 - this.w / 2;
    this.y = canvas.height / 2 - this.h / 2;
    this.facing = MOVEMENT_DOWN;
    this.moving = false;
    this.spriteSpeed = 10;
    this.tempSpriteSpeed = 0;
  }

  getColliderPosition() {
    const resize = 0.5;
    const marginTop = 0.2;
    const x = this.x + (this.w * resize) / 2;
    const y = this.y + (this.h * resize) / 2 + this.h * marginTop;
    const w = this.w * resize;
    const h = this.h * resize;
    return { x, y, w, h };
  }

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

  move(incX, incY) {
    // No need to move character
    // this.x += incX;
    // this.y += incY;
    this.moving = true;
    if (this.moveMoveable) {
      moveable.forEach((moveable) => {
        moveable.move(incX, incY);
      });
    }
  }

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

  getSourcePosition() {
    if (this.moving) {
      this.spriteIdx %= 4;
      return { x: this.spriteIdx * this.w, y: this.getSourceYPosition() };
    } else {
      return { x: 0, y: this.getSourceYPosition() };
    }
  }

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
