// Get a reference to the HTML canvas element with the id 'gameCanvas'.
export const canvas = document.getElementById('gameCanvas');

// Set the width and height of the canvas.
canvas.width = 1024;
canvas.height = 576;

// Define movement key codes.
export const MOVEMENT_UP = 'w';
export const MOVEMENT_DOWN = 's';
export const MOVEMENT_LEFT = 'a';
export const MOVEMENT_RIGHT = 'd';
export const MOVEMENT_RUN = 'shift';

// Define constants for game parameters.
export const FPS = 60; // Frames per second.
export const CHARACTER_SPEED = 3; // Speed of the character.
export const RUN_CHARACTER_SPEED = 4; // Speed of the character when running.

// Create an array of movement keys.
export const MOVEMENT_LIST = [
  MOVEMENT_UP,
  MOVEMENT_DOWN,
  MOVEMENT_LEFT,
  MOVEMENT_RIGHT,
];

// Get the 2D rendering context for the canvas.
const ctx = canvas.getContext('2d');
export default ctx;

// Define offset values for rendering.
export const offsetX = -2539;
export const offsetY = -950;

// Arrays to store collision and movement data.
export const collisions = [];
export const keys = [];
export const collideMap = [];
export const moveable = [];

// Define speeds for dialog typing.
export const dialogSpeed = 20; // Delay between typing characters (in milliseconds).
export const punctuationSpeed = 500; // Additional delay for punctuations (in milliseconds).

// Class to store global game settings.
export class Setting {
  static runTime = 0; // Runtime of the game.
  static lastKey = ''; // Last pressed key.
  static fullscreen = false; // Flag to track fullscreen mode.
  static gameIsStart = false; // Flag to track whether the game has started.
}