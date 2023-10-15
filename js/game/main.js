import { Background } from './model/background.js';
import { Character } from './model/character.js';
import { initiateCollide } from './utils/collision-helper.js';
import ctx, { FPS, keys, moveable, offsetX, offsetY } from './utils/setting.js';

let temp = 0;
ctx.fillStyle = 'black';

ctx.imageSmoothingEnabled = true;
let lastDate = new Date();

const image = new Image();
image.src = '../tiles/Map.png';

const outsideImage = new Image();
outsideImage.src = '../../assets/minecraft-loading.webp';

const playerImage = new Image();
playerImage.src = '../assets/Character/Character.png';

const foregroundImage = new Image();
foregroundImage.src = '../tiles/Foreground.png';

const char = new Character(playerImage, true);
const bg = new Background(image, offsetX, offsetY);
const fg = new Background(foregroundImage, offsetX, offsetY);

moveable.push(bg);
moveable.push(fg);

const getDelta = () => {
  const newDate = new Date();
  const delta = (newDate - lastDate) / 1000;
  lastDate = newDate;
  return delta;
};

const renderBackBackground = () => {
  ctx.drawImage(outsideImage, -100, -100, 1920, 1000);
};

const render = () => {
  temp += getDelta();
  if (temp >= 1 / FPS) {
    renderBackBackground();
    bg.render();
    char.render();
    fg.render();
    temp = 0;
  }
  requestAnimationFrame(render);
};

initiateCollide();

image.onload = () => {
  window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    char.moving = false;
  });
  render();
};
