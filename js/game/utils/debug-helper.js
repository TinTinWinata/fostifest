import ctx from './setting.js';

export const debug = (x, y, w, h, color = 'red') => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};
