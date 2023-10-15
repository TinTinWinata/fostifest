import ctx from '../utils/setting.js';

export class Background {
  constructor(sprite, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  render() {
    ctx.drawImage(this.sprite, this.x, this.y);
  }
}
