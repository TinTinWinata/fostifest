import ctx from '../utils/setting.js';

export class Collider {
  static width = 48;
  static height = 48;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, Boundary.width, Boundary.height);
  }
}
