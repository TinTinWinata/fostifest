import ctx from '../utils/setting.js';

export class Background {
  // Constructor for creating a Background instance.
  constructor(sprite, x, y) {
    this.x = x; // X-coordinate of the background.
    this.y = y; // Y-coordinate of the background.
    this.sprite = sprite; // The image sprite used for the background.
  }

  // Move the background by adjusting its position.
  move(incX, incY) {
    this.x -= incX; // Decrease the X-coordinate to move left.
    this.y -= incY; // Decrease the Y-coordinate to move up.
  }

  // Render the background on the canvas.
  render() {
    ctx.drawImage(this.sprite, this.x, this.y); // Draw the background image on the canvas at the specified coordinates.
  }
}
