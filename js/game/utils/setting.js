export const canvas = document.getElementById('gameCanvas');

canvas.width = 1024;
canvas.height = 576;

export const MOVEMENT_UP = 'w';
export const MOVEMENT_DOWN = 's';
export const MOVEMENT_LEFT = 'a';
export const MOVEMENT_RIGHT = 'd';
export const MOVEMENT_LIST = [
  MOVEMENT_UP,
  MOVEMENT_DOWN,
  MOVEMENT_LEFT,
  MOVEMENT_RIGHT,
];

const ctx = canvas.getContext('2d');
export const collisions = [];
export const keys = [];
export const collideMap = [];
export default ctx;
export const offsetX = -300;
export const offsetY = -300;
