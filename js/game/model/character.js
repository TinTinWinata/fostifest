import { isCollide } from '../utils/collision-helper.js';
import ctx, {
  MOVEMENT_DOWN,
  MOVEMENT_LEFT,
  MOVEMENT_LIST,
  MOVEMENT_RIGHT,
  MOVEMENT_UP,
  keys,
} from '../utils/setting.js';

export class Character {
  constructor(sprite, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.sprite = sprite; // Eiger Loading Purposes
    this.spriteIdx = 0;
    this.totalDivided = 4;
    this.w = sprite.width / this.totalDivided;
    this.h = sprite.height / this.totalDivided;
    this.speed = 0.5;
    this.offsetCheck = 3;
  }

  move(e) {
    switch (e) {
      case MOVEMENT_LEFT:
        if (
          !isCollide(
            this.x - this.speed,
            this.y,
            this.offsetCheck,
            this.offsetCheck
          )
        )
          this.x -= this.speed;
        break;
      case MOVEMENT_RIGHT:
        if (
          !isCollide(
            this.x + this.w + this.speed,
            this.y,
            this.offsetCheck,
            this.offsetCheck
          )
        )
          this.x += this.speed;
        break;
      case MOVEMENT_UP:
        if (
          !isCollide(
            this.x,
            this.y - this.speed,
            this.offsetCheck,
            this.offsetCheck
          )
        )
          this.y -= this.speed;
        break;
      case MOVEMENT_DOWN:
        if (
          !isCollide(
            this.x,
            this.y + this.h + this.speed,
            this.offsetCheck,
            this.offsetCheck
          )
        )
          this.y += this.speed;
        break;
    }
  }

  logic() {
    // Checking movement
    MOVEMENT_LIST.forEach((movementKey) => {
      if (keys[movementKey]) this.move(movementKey);
    });

    this.spriteIdx += 1;
  }

  render() {
    this.logic();
    ctx.drawImage(
      this.sprite,
      0,
      0,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
