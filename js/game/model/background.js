import ctx from '../utils/setting.js';

export class Background {
  constructor(sprite, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  move(incX, incY) {
    this.x -= incX;
    this.y -= incY;
  }
  logic() {}
  render() {
    this.logic();
    ctx.drawImage(this.sprite, this.x, this.y);
  }
}
