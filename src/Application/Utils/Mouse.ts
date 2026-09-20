import EventBus from '../UI/EventBus';

export default class Mouse {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  inScreen: boolean;

  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.normalizedX = 0;
    this.normalizedY = 0;
    this.inScreen = false;

    window.addEventListener('mousemove', (event) => {
      this.x = event.clientX;
      this.y = event.clientY;
      this.normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      this.normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
      EventBus.dispatch('mousemove', { mouse: this });
    });
  }
}

