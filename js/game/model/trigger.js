import { data } from '../data/data.js';
import { debug } from '../utils/debug-helper.js';
import { dialog } from '../utils/dialog-helper.js';
import { moveable } from '../utils/setting.js';

export class Trigger {
  static active = false;
  static currentIndex = 0;
  constructor(dataName, images, player, content, texts) {
    this.collideMap = [];
    this.dataName = dataName;
    this.texts = texts;
    this.initiateCollide(dataName);
    this.images = images;
    this.player = player;
    this.content = content;
    this.alreadyCollide = false;
  }

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

  renderTrigger() {
    for (let i = 0; i < this.collideMap.length; i++) {
      const collide = this.collideMap[i];
      debug(-collide.x, -collide.y, collide.w, collide.h, 'black');
    }
  }

  isCollideCollider(x, y, w, h) {
    const bg = moveable[0];
    // debug(x, y, w, h);
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

  static hide = () => {
    const blackModal = document.getElementById('black-modal');
    const carouselContainer = document.getElementById('gameCarousel');
    carouselContainer.style.display = 'none';
    blackModal.style.display = 'none';
    Trigger.active = false;
  };

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

  static addEvent() {
    const controlNext = document.getElementById('carousel-control-next');
    const controlPrev = document.getElementById('carousel-control-prev');
    const items = document.getElementsByClassName('carousel-item');
    const lengthItem = items.length;
    let activeIdx = -1; // Default Value

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
    controlNext.addEventListener('click', next);
    controlPrev.addEventListener('click', prev);
  }

  show() {
    Trigger.active = true;
    const carouselContainer = document.getElementById('gameCarousel');
    const blackModal = document.getElementById('black-modal');

    carouselContainer.style.display = 'block';
    blackModal.style.display = 'block';

    blackModal.addEventListener('click', Trigger.hide);
    Trigger.addEvent();
  }

  beforeTrigger() {
    Trigger.currentIndex = 0;
    this.build();
    dialog(this.content, 'Narrator', this.show);
  }

  logic() {
    if (!this.player) return;
    const { x, y, w, h } = this.player;
    const isCollide = this.isCollideCollider(x, y, w, h);
    if (isCollide && !this.alreadyCollide) {
      // Is collide but never collide before
      this.beforeTrigger();
      this.alreadyCollide = true;
    } else if (!isCollide && this.alreadyCollide) {
      // If it's not collide and it's have to be collide then make it false
      this.alreadyCollide = false;
    }
  }

  render() {
    this.logic();
  }
}
