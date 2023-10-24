import { dialogSpeed, punctuationSpeed } from './setting.js';

const dialogDiv = document.getElementById('gameDialog');
const dialogTitleDiv = document.getElementById('gameDialogTitle');
const dialogContentDiv = document.getElementById('gameDialogContent');

let typing = false;
let index = 0;
let currentText;
let currentTitle;
let skip = false;
let currentCallback = null;
export let isDialogOpen = false;
const punctuations = [',', '.'];

export const dialog = (text, title, callback) => {
  currentCallback = callback;
  currentText = text;
  currentTitle = title;

  index = 0;
  typing = true;
  openDialog();
  dialogTitleDiv.innerHTML = title;
  dialogContentDiv.innerHTML = '';

  function type() {
    if (skip) {
      dialogContentDiv.innerHTML = currentText;
      skip = false;
      typing = false;
    } else {
      if (index < currentText.length) {
        const char = currentText.charAt(index);
        dialogContentDiv.innerHTML += char;
        index += 1;
        let extraSpeed = 0;
        if (punctuations.includes(char)) {
          extraSpeed += punctuationSpeed;
        }
        setTimeout(type, dialogSpeed + extraSpeed);
      }
      if (index === currentText.length) {
        typing = false;
      }
    }
  }
  type();
};

const openDialog = () => {
  isDialogOpen = true;
  dialogDiv.style.display = 'block';
};

export const closeDialog = () => {
  if (typing) {
    // Skip
    skip = true;
  } else {
    if (currentCallback) {
      currentCallback();
      currentCallback = null;
    }
    isDialogOpen = false;
    dialogDiv.style.display = 'none';
  }
};
