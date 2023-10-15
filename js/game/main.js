import { Background } from './model/background.js';
import { Character } from './model/character.js';
import { drawCollisions, isCollide } from './utils/collision-helper.js';
import ctx, { canvas, keys, offsetX, offsetY } from './utils/setting.js';

ctx.fillStyle = 'black';

const image = new Image();
image.src = '../tiles/Map.png';

const playerImage = new Image();
playerImage.src = '../assets/Character/Character.png';

const char = new Character(playerImage, canvas.width / 2, canvas.height / 2);
const bg = new Background(image, offsetX, offsetY);

isCollide(0, 0);

const render = () => {
  bg.render();
  drawCollisions();
  char.render();
  requestAnimationFrame(render);
};

image.onload = () => {
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });
  render();
};
