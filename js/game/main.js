// Import various modules and classes.
import { AudioData } from './model/audio.js';
import { Background } from './model/background.js';
import { Character } from './model/character.js';
import { Trigger } from './model/trigger.js';
import { initiateCollide } from './utils/collision-helper.js';
import { closeDialog, dialog } from './utils/dialog-helper.js';
import {
  exitFullscreen,
  fullscreenElement,
} from './utils/fullscreen-helper.js';
import ctx, {
  FPS,
  Setting,
  canvas,
  keys,
  offsetX,
  offsetY,
} from './utils/setting.js';

// Check if the device is a mobile or tablet.
window.mobileAndTabletCheck = function () {
  // Check the user agent string for mobile and tablet keywords.
  // Set `check` to `true` if any of the keywords are found.
  let check = false;
  // (The code here checks the user agent string for mobile and tablet devices)
  return check;
};

// Initialize variables.
let temp = 0;
ctx.fillStyle = 'black';
ctx.imageSmoothingEnabled = true;
let lastDate = new Date();

// Load images.
const image = new Image();
image.src = '../tiles/SecondMap.png';

const outsideImage = new Image();
outsideImage.src = '../../assets/minecraft-loading.webp';

let char = null;
let trs = [];

// Preload character image and create Trigger instances.
preloadImage('../assets/Character/Character.png', (img) => {
  char = new Character(img, true);

  // Create Trigger instances with associated data.
  const tr1 = new Trigger(
    'Trigger Lubang Buaya',
    ['/assets/g30spki.webp'],
    char,
    'Tentu, Peristiwa Lubang Buaya adalah sebuah peristiwa penting di Indonesia pada tanggal 30 September 1965. Pada hari itu, sekelompok anggota militer dan pemuda mencoba menggulingkan pemerintahan Presiden Sukarno. Peristiwa ini berujung pada eksekusi beberapa anggota militer di Lubang Buaya, Jakarta. Peristiwa ini membuka jalan menuju pemerintahan baru di bawah Jenderal Soeharto dan memiliki dampak besar pada sejarah politik dan ekonomi Indonesia.',
    ['G30 SPKI']
  );

  const tr2 = new Trigger(
    'Trigger Garden',
    [
      '/assets/komodo.png',
      '/assets/taman-mini-indonesia-indah-pixelated.png',
      '/assets/taman-nasional-ujung-kolon-pixelated.png',
    ],
    char,
    'Indonesia memiliki taman-taman yang indah, seperti Taman Nasional Komodo, yang punya kadal komodo unik. Ada juga Taman Nasional Ujung Kulon yang melindungi badak Jawa langka, serta Taman Mini Indonesia Indah (TMII) di Jakarta yang menampilkan miniatur budaya Indonesia. Semua taman ini adalah tempat yang menakjubkan untuk menjelajahi keindahan alam dan budaya Indonesia.',
    ['Komodo', 'TMII', 'Ujung Kulon']
  );

  const tr3 = new Trigger(
    'Trigger Beach',
    [
      '/assets/pantai-nusa-dua-pixelated.png',
      '/assets/pantai-pink-pixelated.png',
      '/assets/pantai-parangtritis-pixelated.png',
    ],
    char,
    'Indonesia punya banyak pantai cantik. Misalnya, Pantai Nusa Dua di Bali dengan pasir putih dan resor mewahnya. Ada juga Pantai Pink di Pulau Komodo yang punya pasir merah muda, serta Pantai Parangtritis di Yogyakarta yang punya ombak besar. Semua pantai ini punya keindahan uniknya sendiri.',
    ['Nusa Dua', 'Pink', 'Parangtritis']
  );

  const tr4 = new Trigger(
    'Trigger Indonesia House',
    [
      '/assets/rumah-gadang-pixelated.png',
      '/assets/rumah-toraja-pixelated.png',
      '/assets/rumah-joglo-pixelated.png',
    ],
    char,
    'Indonesia memiliki beragam rumah tradisional yang unik. Misalnya, Rumah Gadang di Sumatera Barat, Rumah Toraja dengan atap perahu di Sulawesi Selatan, dan Rumah Joglo di Jawa Tengah. Setiap rumah ini memancarkan karakteristik budaya yang khas.',
    ['Gadang', 'Toraja', 'Joglo']
  );

  const tr5 = new Trigger(
    'Trigger Home',
    [
      '/assets/musem-gajah-pixelated.png',
      '/assets/museum-bali-pixelated.png',
      '/assets/museum-wayang-pixelated.png',
    ],
    char,
    'Indonesia membanggakan berbagai macam museum yang unik dan menarik. Misalnya, Museum Nasional Indonesia di Jakarta, yang memiliki koleksi yang sangat kaya tentang budaya, sejarah, dan seni Indonesia. Di Denpasar, Bali, terdapat Museum Bali yang memamerkan seni dan budaya khas pulau tersebut. Setiap museum ini adalah tempat yang luar biasa untuk memahami kekayaan budaya Indonesia.',
    ['Gajah', 'Bali', 'Wayang']
  );
  loadGame();
  // Add Trigger instances to the `trs` array.
  trs.push(tr1, tr2, tr3, tr4, tr5);

  // Load the game.
  loadGame();
});

// Create a Background instance.
const bg = new Background(image, offsetX, offsetY);

// Function to toggle the HUD (Hide/Show).
const toggleHud = (show = false) => {
  const divs = document.getElementsByClassName('hide-game');
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    div.style.opacity = show ? '100%' : '0%';
  }
};
toggleHud(false);

// Add event listener to canvas to handle game actions.
const action = () => {
  if (Trigger.active) {
    Trigger.hide();
  }
  closeDialog();
};
canvas.addEventListener('click', action);

// Function to get the time delta.
const getDelta = () => {
  const newDate = new Date();
  const delta = (newDate - lastDate) / 1000;
  lastDate = newDate;
  return delta;
};

// Function to start the game.
export const startGame = () => {
  toggleHud(true);
  const audio = AudioData.getInstance();
  audio.play(AudioData.MUSIC_VILLAGE, true);
  dialog(
    'Selamat datang saudara-saudari, ke dalam dunia ajaib Ekspresi Seni Digital Nusantara: Kombinasi Tradisi dan Teknologi. Tekan Tombol [W A S D] untuk Berjalan ',
    'Narrator'
  );
  Setting.gameIsStart = true;
};

// Function to render the background.
const renderBackBackground = () => {
  ctx.drawImage(outsideImage, -100, -100, 1920, 1000);
};

// Main render loop.
const render = () => {
  temp += getDelta();
  if (temp >= 1 / FPS) {
    renderBackBackground();
    bg.render();
    char.render();
    trs.forEach((tr) => tr.render());
    temp = 0;
  }
  requestAnimationFrame(render);
};

// Initialize collision data.
initiateCollide();

// Function to preload an image.
function preloadImage(url, callback) {
  var img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.src = url;
}

// Function to toggle fullscreen button visibility.
const toggleFullscreenButton = () => {
  const fullscreenDiv = document.getElementById('fullscreen');
  const unfullscreenDiv = document.getElementById('unfullscreen');
  if (Setting.fullscreen) {
    fullscreenDiv.style.display = 'none';
    unfullscreenDiv.style.display = 'block';
  } else {
    fullscreenDiv.style.display = 'block';
    unfullscreenDiv.style.display = 'none';
  }
};

// Function to add event listeners for fullscreen button.
const addEventFullscreen = () => {
  toggleFullscreenButton();
  const fullscreenDiv = document.getElementById('fullscreen');
  const unfullscreenDiv = document.getElementById('unfullscreen');
  fullscreenDiv.addEventListener('click', toggleFullscreen);
  unfullscreenDiv.addEventListener('click', toggleFullscreen);
};

// Function to toggle fullscreen mode.
const toggleFullscreen = () => {
  const container = document.getElementById('game-container');
  if (Setting.fullscreen) {
    // Exit fullscreen
    screen.orientation.unlock('landscape');
    exitFullscreen();
  } else {
    // Enter fullscreen
    screen.orientation.lock('landscape');
    fullscreenElement(container);
  }
  Setting.fullscreen = !Setting.fullscreen;
  toggleFullscreenButton();
};

// Function to add event listeners for touch/mouse input.
const addListener = (div, key) => {
  div.addEventListener('touchstart', (e) => {
    keys[key] = true;
  });
  document.addEventListener('touchend', (e) => {
    keys[key] = false;
    char.moving = false;
  });
  div.addEventListener('mousedown', (e) => {
    keys[key] = true;
  });
  document.addEventListener('mouseup', (e) => {
    keys[key] = false;
    char.moving = false;
  });
  document.addEventListener('dragend', (e) => {
    keys[key] = false;
    char.moving = false;
  });
};

// Function to add joystick event listeners.
const addJoypadEvent = () => {
  const left = document.getElementById('game-joypad-left');
  const top = document.getElementById('game-joypad-top');
  const right = document.getElementById('game-joypad-right');
  const down = document.getElementById('game-joypad-down');
  addListener(left, 'a');
  addListener(down, 's');
  addListener(right, 'd');
  addListener(top, 'w');
};

// Function to check if joystick is needed based on device type.
const checkNeedJoypad = () => {
  if (window.mobileAndTabletCheck()) {
    const joypadDiv = document.getElementById('game-joypad');
    joypadDiv.style.display = 'flex';
    addJoypadEvent();
  }
};

// Function to load the game after all setup is complete.
const loadGame = () => {
  checkNeedJoypad();
  addEventFullscreen();
  window.addEventListener('keydown', (e) => {
    if (e.key === 'f') toggleFullscreen();
    if (Setting.gameIsStart) {
      e.preventDefault();
      if (e.key === ' ' || e.key === 'Enter') {
        action();
      }
      keys[e.key.toLowerCase()] = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    char.moving = false;
  });
  render();
};
