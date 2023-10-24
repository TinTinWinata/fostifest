import ctx from './setting.js';

// A debugging function to draw a filled rectangle with specified coordinates, dimensions, and color.
export const debug = (x, y, w, h, color = 'red') => {
  ctx.fillStyle = color; // Set the fill color for drawing.
  ctx.fillRect(x, y, w, h); // Draw a filled rectangle at the specified (x, y) coordinates with the given width (w) and height (h).
};
