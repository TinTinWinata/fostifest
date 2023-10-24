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
  moveable,
  offsetX,
  offsetY,
} from './utils/setting.js';

window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

let temp = 0;
ctx.fillStyle = 'black';

ctx.imageSmoothingEnabled = true;
let lastDate = new Date();

const image = new Image();
image.src = '../tiles/SecondMap.png';

const outsideImage = new Image();
outsideImage.src = '../../assets/minecraft-loading.webp';
let char = null;
let trs = [];
preloadImage('../assets/Character/Character.png', (img) => {
  char = new Character(img, true);
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
  trs.push(tr1, tr2, tr3, tr4, tr5);
});
const bg = new Background(image, offsetX, offsetY);

moveable.push(bg);
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
    'Selamat datang saudara-saudari, ke dalam dunia ajaib Ekspresi Seni Digital Nusantara: Kombinasi Tradisi dan Teknologi. Tekan Tombol [W A S D] untuk Berjalan ',
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
    trs.forEach((tr) => tr.render());
    temp = 0;
  }
  requestAnimationFrame(render);
};

initiateCollide();

function preloadImage(url, callback) {
  var img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.src = url;
}

// images.forEach((image) => {
//   image.onload = () => {
//     countLoadedImage += 1;
//     if (countLoadedImage === images.length) {
//       loadGame();
//     }
//   };
// });

const action = () => {
  if (Trigger.active) {
    Trigger.hide();
  }
  closeDialog();
};

canvas.addEventListener('click', action);

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

const addEventFullscreen = () => {
  toggleFullscreenButton();
  const fullscreenDiv = document.getElementById('fullscreen');
  const unfullscreenDiv = document.getElementById('unfullscreen');
  fullscreenDiv.addEventListener('click', toggleFullscreen);
  unfullscreenDiv.addEventListener('click', toggleFullscreen);
};

const toggleFullscreen = () => {
  const container = document.getElementById('game-container');
  if (Setting.fullscreen) {
    // Exit fullscreen
    screen.orientation.unlock('landscape');
    exitFullscreen();
  } else {
    // Fullscreen the computer
    screen.orientation.lock('landscape');
    fullscreenElement(container);
  }
  Setting.fullscreen = !Setting.fullscreen;
  toggleFullscreenButton();
};

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

const checkNeedJoypad = () => {
  if (window.mobileAndTabletCheck()) {
    const joypadDiv = document.getElementById('game-joypad');
    joypadDiv.style.display = 'flex';
    addJoypadEvent();
  }
};

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
