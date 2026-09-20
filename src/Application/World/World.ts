import * as THREE from 'three';
import ModernMonitor from './ModernMonitor';
import ModernWorkstation from './ModernWorkstation';

export default class World {
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  monitor: ModernMonitor;
  workstation: ModernWorkstation;

  constructor(scene: THREE.Scene, cssScene: THREE.Scene) {
    this.scene = scene;
    this.cssScene = cssScene;

    this.workstation = new ModernWorkstation(this.scene);
    this.monitor = new ModernMonitor(this.scene, this.cssScene);
  }

  update(elapsed: number, camera?: THREE.Camera, mouse?: any) {
    if (this.workstation) {
      this.workstation.update(elapsed);
    }
    if (this.monitor && camera) {
      this.monitor.update(camera, mouse);
    }
  }
}

