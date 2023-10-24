export const canvas = document.getElementById('gameCanvas');

canvas.width = 1024;
canvas.height = 576;

export const MOVEMENT_UP = 'w';
export const MOVEMENT_DOWN = 's';
export const MOVEMENT_LEFT = 'a';
export const MOVEMENT_RIGHT = 'd';
export const MOVEMENT_RUN = 'shift';
export const FPS = 60;
export const CHARACTER_SPEED = 3;
export const RUN_CHARACTER_SPEED = 4;

export const MOVEMENT_LIST = [
  MOVEMENT_UP,
  MOVEMENT_DOWN,
  MOVEMENT_LEFT,
  MOVEMENT_RIGHT,
];

const ctx = canvas.getContext('2d');
export default ctx;
export const offsetX = -2539;
export const offsetY = -950;
export const collisions = [];
export const keys = [];
export const collideMap = [];
export const moveable = [];
export const dialogSpeed = 20; // 5 ms
export const punctuationSpeed = 500;

export class Setting {
  static runTime = 0;
  static lastKey = '';
  static fullscreen = false;
  static gameIsStart = false;
}
