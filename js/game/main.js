import { AudioData } from './model/audio.js';
import { Background } from './model/background.js';
import { Character } from './model/character.js';
import { Trigger } from './model/trigger.js';
import { initiateCollide } from './utils/collision-helper.js';
import { closeDialog, dialog } from './utils/dialog-helper.js';
import ctx, {
  FPS,
  Setting,
  keys,
  moveable,
  offsetX,
  offsetY,
} from './utils/setting.js';

let temp = 0;
ctx.fillStyle = 'black';

ctx.imageSmoothingEnabled = true;
let lastDate = new Date();

const image = new Image();
image.src = '../tiles/SecondMap.png';

const outsideImage = new Image();
outsideImage.src = '../../assets/minecraft-loading.webp';

const playerImage = new Image();
playerImage.src = '../assets/Character/Character.png';

const foregroundImage = new Image();
foregroundImage.src = '../tiles/Foreground.png';

const char = new Character(playerImage, true);
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
    '/assets/taman-mini-indonesia-indah.jpeg',
    '/assets/taman-nasional-ujung-kulon.webp',
  ],
  char,
  'Indonesia memiliki taman-taman yang indah, seperti Taman Nasional Komodo, yang punya kadal komodo unik. Ada juga Taman Nasional Ujung Kulon yang melindungi badak Jawa langka, serta Taman Mini Indonesia Indah (TMII) di Jakarta yang menampilkan miniatur budaya Indonesia. Semua taman ini adalah tempat yang menakjubkan untuk menjelajahi keindahan alam dan budaya Indonesia.',
  ['Komodo', 'TMII', 'Ujung Kulon']
);

const tr3 = new Trigger(
  'Trigger Beach',
  [
    '/assets/pantai-nusa-dua.jpg',
    '/assets/pantai-pink.jpg',
    '/assets/pantai-parangtritis.jpg',
  ],
  char,
  'Indonesia punya banyak pantai cantik. Misalnya, Pantai Nusa Dua di Bali dengan pasir putih dan resor mewahnya. Ada juga Pantai Pink di Pulau Komodo yang punya pasir merah muda, serta Pantai Parangtritis di Yogyakarta yang punya ombak besar. Semua pantai ini punya keindahan uniknya sendiri.',
  ['Nusa Dua', 'Pink', 'Parangtritis']
);

const tr4 = new Trigger(
  'Trigger Indonesia House',
  [
    '/assets/rumah-gadang.jpg',
    '/assets/rumah-toraja.jpg',
    '/assets/rumah-joglo.jpg',
  ],
  char,
  'Indonesia memiliki beragam rumah tradisional yang unik. Misalnya, Rumah Gadang di Sumatera Barat, Rumah Toraja dengan atap perahu di Sulawesi Selatan, dan Rumah Joglo di Jawa Tengah. Setiap rumah ini memancarkan karakteristik budaya yang khas.',
  ['Gadang', 'Toraja', 'Joglo']
);

const tr5 = new Trigger(
  'Trigger Home',
  [
    '/assets/museum-gajah.jpg',
    '/assets/museum-bali.jpg',
    '/assets/museum-wayang.jpg',
  ],
  char,
  'Indonesia membanggakan berbagai macam museum yang unik dan menarik. Misalnya, Museum Nasional Indonesia di Jakarta, yang memiliki koleksi yang sangat kaya tentang budaya, sejarah, dan seni Indonesia. Di Denpasar, Bali, terdapat Museum Bali yang memamerkan seni dan budaya khas pulau tersebut. Setiap museum ini adalah tempat yang luar biasa untuk memahami kekayaan budaya Indonesia.',
  ['Gajah', 'Bali', 'Wayang']
);
const bg = new Background(image, offsetX, offsetY);
const fg = new Background(foregroundImage, offsetX, offsetY);

moveable.push(bg);
moveable.push(fg);
closeDialog();

const getDelta = () => {
  const newDate = new Date();
  const delta = (newDate - lastDate) / 1000;
  lastDate = newDate;
  return delta;
};

export const startGame = () => {
  const audio = AudioData.getInstance();
  audio.play(AudioData.MUSIC_VILLAGE, true);
  dialog(
    'Selamat datang, saudara-saudari, ke dalam dunia ajaib Ekspresi Seni Digital Nusantara: Kombinasi Tradisi dan Teknologi. Tekan Tombol [W A S D] untuk Berjalan ',
    'Narrator'
  );
  Setting.gameIsStart = true;
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
    tr1.render();
    tr2.render();
    tr3.render();
    tr4.render();
    tr5.render();
    // drawCollisions();
    temp = 0;
  }
  requestAnimationFrame(render);
};

initiateCollide();

image.onload = () => {
  window.addEventListener('keydown', (e) => {
    if (Setting.gameIsStart) {
      e.preventDefault();
      if (e.key === ' ' || e.key === 'Enter') {
        if (Trigger.active) {
          Trigger.hide();
        }
        closeDialog();
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
