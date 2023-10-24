import { data } from '../data/data.js';
import { debug } from '../utils/debug-helper.js';
import { dialog } from '../utils/dialog-helper.js';
import { moveable } from '../utils/setting.js';

export class Trigger {
  static active = false; // Flag to track if a trigger is currently active.
  static currentIndex = 0; // Index of the current trigger.
  static clickEventAlreadyAdd = false; // Flag to track if a trigger is already active.
  constructor(dataName, images, player, content, texts) {
    this.collideMap = []; // Array to store collision map data.
    this.dataName = dataName; // Name of the trigger data layer.
    this.texts = texts; // Array of text for the trigger.
    this.initiateCollide(dataName); // Initialize collision map from data.
    this.images = images; // Array of images for the trigger.
    this.player = player; // Reference to the player.
    this.content = content; // Content for the trigger dialog.
    this.alreadyCollide = false; // Flag to track if the trigger has already been triggered.
  }

  // Initialize the collision map from data.
  initiateCollide = (dataName) => {
    const collisions = data.layers.find((layer) => layer.name === dataName);
    const map = [];

    for (let i = 0; i < collisions.data.length; i += collisions.width) {
      map.push(collisions.data.slice(i, collisions.width + i));
    }

    map.forEach((mapArr, y) => {
      mapArr.forEach((mapVal, x) => {
        if (mapVal !== 0)
          this.collideMap.push({ x: x * 32, y: y * 32, w: 32, h: 32 });
      });
    });
  };

  // Render collision map for debugging purposes.
  renderTrigger() {
    for (let i = 0; i < this.collideMap.length; i++) {
      const collide = this.collideMap[i];
      debug(-collide.x, -collide.y, collide.w, collide.h, 'black');
    }
  }

  // Check if a collision occurs between the player and the trigger area.
  isCollideCollider(x, y, w, h) {
    const bg = moveable[0];
    for (let i = 0; i < this.collideMap.length; i++) {
      const collide = this.collideMap[i];
      if (
        x + w >= collide.x + bg.x &&
        x <= collide.x + bg.x + collide.w &&
        y + h >= collide.y + bg.y &&
        y <= collide.y + collide.h + bg.y
      )
        return true;
    }
    return false;
  }

  // Build the HTML for the trigger dialog and image carousel.
  buildMap(active, asset, text) {
    return `
    <div class="carousel-item ${active && 'active'}">
      <h2>${text}</h2>
      <img
        class="d-block carousel-image"
        src="${asset}"
        alt="Image Slide"
      />
   </div>`;
  }

  // Hide the trigger dialog and carousel.
  static hide = () => {
    const blackModal = document.getElementById('black-modal');
    const carouselContainer = document.getElementById('gameCarousel');
    carouselContainer.style.display = 'none';
    blackModal.style.display = 'none';
    Trigger.currentIndex = 0;
    Trigger.active = false;
  };

  // Build the image carousel for the trigger.
  build() {
    const carouselRoot = document.getElementById('carousel-root');
    let temp = '';

    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];
      const text = this.texts[i];
      temp += this.buildMap(i == 0, image, text);
    }

    carouselRoot.innerHTML = temp;
  }

  // Add event listeners for carousel navigation.
  static addEvent() {
    const controlNext = document.getElementById('carousel-control-next');
    const controlPrev = document.getElementById('carousel-control-prev');
    const items = document.getElementsByClassName('carousel-item');
    const lengthItem = items.length;
    let activeIdx = -1;

    const next = () => {
      Trigger.currentIndex += 1;
      activeIdx = Trigger.currentIndex % lengthItem;
      for (let i = 0; i < lengthItem; i++) {
        items[i].classList.remove('active');
      }
      items[activeIdx].classList.add('active');
    };

    const prev = () => {
      Trigger.currentIndex -= 1;
      if (Trigger.currentIndex < 0) {
        Trigger.currentIndex += lengthItem;
      }
      activeIdx = Trigger.currentIndex % lengthItem;
      for (let i = 0; i < lengthItem; i++) {
        items[i].classList.remove('active');
      }
      items[activeIdx].classList.add('active');
    };

    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'arrowleft') next();
      if (key === 'd' || key === 'arrowright') prev();
    });

    if (!Trigger.clickEventAlreadyAdd) {
      controlNext.addEventListener('click', next);
      controlPrev.addEventListener('click', prev);
      Trigger.clickEventAlreadyAdd = true;
    }
  }

  // Show the trigger dialog and carousel.
  show() {
    Trigger.active = true;
    const carouselContainer = document.getElementById('gameCarousel');
    const blackModal = document.getElementById('black-modal');
    carouselContainer.style.display = 'block';
    blackModal.style.display = 'block';
    blackModal.addEventListener('click', Trigger.hide);
    Trigger.addEvent();
  }

  // Perform actions before showing the trigger.
  beforeTrigger() {
    Trigger.currentIndex = 0;
    this.build();
    dialog(this.content, 'Narrator', this.show);
  }

  // Logic for checking collision with the player and triggering the dialog.
  logic() {
    if (!this.player) return;
    const { x, y, w, h } = this.player;
    const isCollide = this.isCollideCollider(x, y, w, h);
    if (isCollide && !this.alreadyCollide) {
      // Collided for the first time
      this.beforeTrigger();
      this.alreadyCollide = true;
    } else if (!isCollide && this.alreadyCollide) {
      // No longer collided
      this.alreadyCollide = false;
    }
  }

  // Update and render the trigger logic.
  render() {
    this.logic();
  }
}
