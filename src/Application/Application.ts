import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Mouse from './Utils/Mouse';
import Time from './Utils/Time';
import Camera from './Camera/Camera';
import Renderer from './Renderer';
import World from './World/World';
import AudioManager from './Audio/AudioManager';
import EventBus from './UI/EventBus';

export default class Application {
  static instance: Application;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  sizes: Sizes;
  mouse: Mouse;
  time: Time;
  camera: Camera;
  renderer: Renderer;
  world: World;
  audio: AudioManager;

  constructor() {
    if (Application.instance) {
      return Application.instance;
    }
    Application.instance = this;

    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();

    this.sizes = new Sizes();
    this.mouse = new Mouse();
    this.time = new Time();

    const cssContainer = document.getElementById('css') || document.body;
    this.camera = new Camera(this.sizes, this.mouse, cssContainer);
    this.renderer = new Renderer(this.scene, this.cssScene, this.camera, this.sizes);
    this.audio = new AudioManager(this.camera.instance, this.scene);
    this.world = new World(this.scene, this.cssScene);

    this.setupEvents();
  }

  private setupEvents() {
    EventBus.on('resize', () => {
      this.renderer.resize();
    });

    EventBus.on('tick', ({ elapsed }) => {
      this.camera.update();
      this.world.update(elapsed, this.camera.instance, this.mouse);

      // Distance from camera to monitor center (0, 520, 0)
      const monitorCenter = new THREE.Vector3(0, 520, 0);
      const dist = this.camera.instance.position.distanceTo(monitorCenter);
      this.audio.update(dist);

      this.renderer.update();
    });
  }
}

