import EventBus from '../UI/EventBus';

export default class Time {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor() {
    this.start = performance.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    EventBus.on('bootDone', () => {
      this.start = performance.now();
    });

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = performance.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    EventBus.dispatch('tick', { delta: this.delta, elapsed: this.elapsed });

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

