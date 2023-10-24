// Method to preloads all the images (for automatic caching in javascript) [eiger loading]
// Make user doesn't load the image on the runtime but load at first time they go in the website
const preloadImags = (srcs) => {
  for (let i = 0; i < srcs.length; i++) {
    const image = new Image();
    image.src = srcs[i];
  }
};

preloadImags([
  './assets/logo.png',
  '/assets/dialog.png',
  '/assets/wallpaper_fixed.png',
  '/assets/indonesia-3.png',
  '/assets/justine-winata.jpeg',
  '/assets/border.png',
  '/assets/beach.jpg',
  '/assets/taman-nasional-bunaken.jpg',
  '/assets/candi-borobudur.jpg',
  '/assets/taman-nasional-komodo.jpg',
  '/assets/uluwatu.jpg',
  '/assets/g30spki.png',
  '/assets/komodo.png',
  '/assets/taman-mini-indonesia-indah-pixelated.png',
  '/assets/taman-nasional-ujung-kolon-pixelated.png',
  '/assets/pantai-nusa-dua-pixelated.png',
  '/assets/pantai-pink-pixelated.png',
  '/assets/pantai-parangtritis-pixelated.png',
  '/assets/rumah-gadang-pixelated.png',
  '/assets/rumah-toraja-pixelated.png',
  '/assets/rumah-joglo-pixelated.png',
  '/assets/musem-gajah-pixelated.png',
  '/assets/museum-bali-pixelated.png',
  '/assets/museum-wayang-pixelated.png',
]);
