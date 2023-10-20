import { startGame } from './game/main.js';

const playBtnDiv = document.getElementById('play-game-btn');
const gameHider = document.getElementsByClassName('game-hider');

playBtnDiv.addEventListener('click', () => {
  for (let i = 0; i < gameHider.length; i++) {
    gameHider[i].style.display = 'none';
  }
  startGame();
});

const barDiv = document.getElementById('bar');
const second = 8;

const triggerLoading = () => {
  onLoading();
  setTimeout(() => {
    finishLoading();
  }, second * 1000);
};

const onLoading = () => {
  barDiv.style.width = '100%';
  barDiv.style.transition = `all ${second}s ease`;
};

const finishLoading = () => {
  barDiv.style.width = '0%';
  barDiv.style.transition = 'all 2s ease';
};

triggerLoading();
setInterval(() => {
  triggerLoading();
}, 7000);

// window.addEventListener('mousedown', () => {
//   barDiv.style.width = '100%';
//   barDiv.style.transition = 'all 5s ease';
// });

// window.addEventListener('mouseup', () => {
//   barDiv.style.width = '0%';
//   barDiv.style.transition = 'all 2s ease';
// });
