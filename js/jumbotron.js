// Import the startGame function from the 'main.js' module
import { startGame } from './game/main.js';

// Get the paly button div and game hider div
const playBtnDiv = document.getElementById('play-game-btn');
const gameHider = document.getElementsByClassName('game-hider');

// Function to check if the device is in portrait orientation and is a mobile or tablet
const isMobileAndPortrait = () =>
  window.matchMedia('(orientation: portrait)').matches &&
  window.mobileAndTabletCheck();

// Add a click event listener to the play button
playBtnDiv.addEventListener('click', () => {
  // Check if the device is in portrait orientation and is a mobile or tablet
  if (isMobileAndPortrait()) {
    // Display an error message if conditions are met
    const error = document.getElementById('errorMessage');
    error.style.opacity = '100%';
    return;
  }

  // Hide elements with the 'game-hider' class so the game can be seen enough
  for (let i = 0; i < gameHider.length; i++) {
    gameHider[i].style.display = 'none';
  }
  // Start the game by calling the startGame function
  startGame();
});

// Get the loading bar element by its ID
const barDiv = document.getElementById('bar');

// Define the duration of the loading animation in seconds
const second = 8;

// Function to trigger the loading animation
const triggerLoading = () => {
  // Start the loading animation
  onLoading();
  // Set a timeout to finish the loading animation after a specified duration
  setTimeout(() => {
    finishLoading();
  }, second * 1000);
};

// Function to start the loading animation
const onLoading = () => {
  barDiv.style.width = '100%';
  barDiv.style.transition = `all ${second}s ease`;
};

// Function to finish the loading animation
const finishLoading = () => {
  barDiv.style.width = '0%';
  barDiv.style.transition = 'all 2s ease';
};

// Trigger the initial loading animation
triggerLoading();

// Set an interval to repeatedly trigger the loading animation
setInterval(() => {
  triggerLoading();
}, 10000);
