import * as THREE from 'three';
import EventBus from '../UI/EventBus';

export default class AudioManager {
  listener: THREE.AudioListener;
  audioLoader: THREE.AudioLoader;
  buffers: { [key: string]: AudioBuffer } = {};
  ambienceSound?: THREE.Audio;
  ambienceFilter?: BiquadFilterNode;
  isMuted: boolean = false;
  camera: THREE.Camera;
  scene: THREE.Scene;

  constructor(camera: THREE.Camera, scene: THREE.Scene) {
    this.camera = camera;
    this.scene = scene;
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.audioLoader = new THREE.AudioLoader();

    this.loadAudioFiles();
    this.setupEventListeners();
  }

  private loadAudioFiles() {
    const audioList = [
      { name: 'startup', path: '/audio/startup/startup.mp3' },
      { name: 'office', path: '/audio/atmosphere/office.mp3' },
      { name: 'mouseDown', path: '/audio/mouse/mouse_down.mp3' },
      { name: 'mouseUp', path: '/audio/mouse/mouse_up.mp3' },
      { name: 'type', path: '/audio/cc/type.mp3' },
      { name: 'key1', path: '/audio/keyboard/key_1.mp3' },
      { name: 'key2', path: '/audio/keyboard/key_2.mp3' },
      { name: 'key3', path: '/audio/keyboard/key_3.mp3' },
      { name: 'key4', path: '/audio/keyboard/key_4.mp3' },
      { name: 'key5', path: '/audio/keyboard/key_5.mp3' },
      { name: 'key6', path: '/audio/keyboard/key_6.mp3' },
    ];

    audioList.forEach(({ name, path }) => {
      this.audioLoader.load(
        path,
        (buffer) => {
          this.buffers[name] = buffer;
        },
        undefined,
        (err) => {
          console.warn(`Could not load audio: ${path}`, err);
        }
      );
    });
  }

  private setupEventListeners() {
    EventBus.on('muteToggle', (muted: boolean) => {
      this.isMuted = muted;
      this.listener.setMasterVolume(muted ? 0 : 1);
    });

    EventBus.on('bootDone', () => {
      this.playStartup();
      this.playAmbience();
    });

    // Keyboard & mouse click listeners
    window.addEventListener('keydown', (e) => {
      if (e.key && e.key.startsWith('_AUTO_')) {
        this.playTypeSound();
      } else {
        this.playMechanicalKey();
      }
    });

    window.addEventListener('mousedown', () => {
      this.playMouseClick(true);
    });

    window.addEventListener('mouseup', () => {
      this.playMouseClick(false);
    });
  }

  playStartup() {
    if (this.buffers['startup']) {
      const sound = new THREE.Audio(this.listener);
      sound.setBuffer(this.buffers['startup']);
      sound.setVolume(0.4);
      sound.play();
    }
  }

  playAmbience() {
    if (this.buffers['office'] && !this.ambienceSound) {
      const sound = new THREE.Audio(this.listener);
      sound.setBuffer(this.buffers['office']);
      sound.setLoop(true);
      sound.setVolume(0.12);

      const ctx = sound.context;
      this.ambienceFilter = ctx.createBiquadFilter();
      this.ambienceFilter.type = 'lowpass';
      this.ambienceFilter.frequency.setValueAtTime(3000, ctx.currentTime);
      sound.setFilter(this.ambienceFilter);

      sound.play();
      this.ambienceSound = sound;
    }
  }

  playMechanicalKey() {
    const keyIndex = Math.floor(Math.random() * 6) + 1;
    const buffer = this.buffers[`key${keyIndex}`];
    if (buffer) {
      const sound = new THREE.Audio(this.listener);
      sound.setBuffer(buffer);
      sound.setVolume(0.35);
      const detune = (Math.random() * 200 - 100);
      sound.setDetune(detune);
      sound.play();
    }
  }

  playMouseClick(isDown: boolean) {
    const name = isDown ? 'mouseDown' : 'mouseUp';
    const buffer = this.buffers[name];
    if (buffer) {
      const sound = new THREE.Audio(this.listener);
      sound.setBuffer(buffer);
      sound.setVolume(0.3);
      sound.play();
    }
  }

  playTypeSound() {
    const buffer = this.buffers['type'];
    if (buffer) {
      const sound = new THREE.Audio(this.listener);
      sound.setBuffer(buffer);
      sound.setVolume(0.1);
      sound.play();
    }
  }

  update(distanceToMonitor: number) {
    // Dynamically filter room ambience based on proximity to the screen
    if (this.ambienceFilter && this.ambienceSound) {
      const freq = Math.max(120, Math.min(18000, (distanceToMonitor / 3000) * 12000));
      this.ambienceFilter.frequency.setValueAtTime(freq, this.ambienceSound.context.currentTime);
    }
  }
}

