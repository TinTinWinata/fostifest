import { dialogSpeed, punctuationSpeed } from './setting.js';

// Get references to HTML elements for dialog display.
const dialogDiv = document.getElementById('gameDialog');
const dialogTitleDiv = document.getElementById('gameDialogTitle');
const dialogContentDiv = document.getElementById('gameDialogContent');

let typing = false; // Flag to track if text is currently being typed.
let index = 0; // Index to keep track of the current character being typed.
let currentText; // The text content of the dialog.
let currentTitle; // The title of the dialog.
let skip = false; // Flag to indicate whether typing should be skipped.
let currentCallback = null; // Callback function to execute after the dialog.
export let isDialogOpen = false; // Flag to track if the dialog is currently open.

const punctuations = [',', '.']; // List of punctuations that affect typing speed.

// Function to display dialog with specified text, title, and an optional callback.
export const dialog = (text, title, callback) => {
  currentCallback = callback;
  currentText = text;
  currentTitle = title;

  index = 0;
  typing = true;
  openDialog();
  dialogTitleDiv.innerHTML = title;
  dialogContentDiv.innerHTML = '';

  // Function to simulate typing text character by character.
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

// Function to open the dialog box.
const openDialog = () => {
  isDialogOpen = true;
  dialogDiv.style.display = 'block';
};

// Function to close the dialog box.
export const closeDialog = () => {
  if (typing) {
    // Skip the typing animation.
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
