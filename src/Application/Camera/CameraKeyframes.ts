import * as THREE from 'three';

export class CameraKeyframeInstance {
  position: THREE.Vector3;
  focalPoint: THREE.Vector3;

  constructor(pos: THREE.Vector3, foc: THREE.Vector3) {
    this.position = pos.clone();
    this.focalPoint = foc.clone();
  }

  update(
    _mouse?: { x: number; y: number; normalizedX: number; normalizedY: number },
    _aspect?: number,
    _fov?: number
  ) {}
}

/**
 * ZOOM LEVEL 3: Room Overview (Far Away)
 * Zoomed out further to show the complete architectural studio, desk, PC, chair, window, and floor
 */
export class ZoomLevel3Overview extends CameraKeyframeInstance {
  origin: THREE.Vector3;
  time: number = 0;

  constructor() {
    // Zoomed out further for a grand perspective of the entire studio
    const pos = new THREE.Vector3(-1850, 1150, 2700);
    const foc = new THREE.Vector3(0, 420, 0);
    super(pos, foc);
    this.origin = pos.clone();
  }

  update() {
    this.time += 0.0005;
    this.position.x = this.origin.x + Math.sin(this.time) * 350;
    this.position.z = this.origin.z + Math.cos(this.time * 0.7) * 200;
    this.position.y = this.origin.y + Math.sin(this.time * 0.4) * 60;
  }
}

/**
 * ZOOM LEVEL 2: Workstation Setup View (Between Level 1 and Level 3)
 * Positioned halfway between Level 1 (desk/table) and Level 3 (far room overview)
 * Beautiful 3/4 isometric workstation view displaying the desk, Fractal PC tower, chair, and accessories
 */
export class ZoomLevel2Table extends CameraKeyframeInstance {
  originPos: THREE.Vector3;
  originFoc: THREE.Vector3;

  constructor() {
    // Perfectly intermediate between New Level 1 (0, 640, 1340) and New Level 3 (-1850, 1150, 2700)
    const pos = new THREE.Vector3(-900, 880, 2000);
    const foc = new THREE.Vector3(0, 470, 0);
    super(pos, foc);
    this.originPos = pos.clone();
    this.originFoc = foc.clone();
  }

  update(
    mouse?: { normalizedX: number; normalizedY: number },
    aspect?: number,
    _fov?: number
  ) {
    if (mouse) {
      const targetX = this.originPos.x + mouse.normalizedX * 110;
      const targetY = this.originPos.y + mouse.normalizedY * 55;
      this.position.x += (targetX - this.position.x) * 0.05;
      this.position.y += (targetY - this.position.y) * 0.05;
    }

    const currentAspect = aspect || 1.777;
    if (currentAspect < 1.4) {
      const pullback = (1.4 / currentAspect - 1) * 600;
      this.position.z = this.originPos.z + Math.min(pullback, 1000);
    } else {
      this.position.z = this.originPos.z;
    }
  }
}

/**
 * ZOOM LEVEL 1: Table & Monitor Screen View (Old Level 2 is now New Level 1)
 * Full table is visible with keyboard, mouse, accessories, and monitor screen directly centered.
 * Dynamically pulls back on mobile portrait view just enough to frame the entire 1448mm monitor edge-to-edge.
 */
export class ZoomLevel1Screen extends CameraKeyframeInstance {
  originPos: THREE.Vector3;
  originFoc: THREE.Vector3;

  constructor() {
    // Old Level 2 table view is now the New Level 1
    const pos = new THREE.Vector3(0, 640, 1340);
    const foc = new THREE.Vector3(0, 520, 0);
    super(pos, foc);
    this.originPos = pos.clone();
    this.originFoc = foc.clone();
  }

  update(
    mouse?: { normalizedX: number; normalizedY: number },
    aspect?: number,
    fov?: number
  ) {
    const currentAspect = aspect || 1.777;
    const currentFov = fov || 38;

    if (mouse) {
      const targetX = this.originPos.x + mouse.normalizedX * 80;
      const targetY = this.originPos.y + mouse.normalizedY * 40;
      this.position.x += (targetX - this.position.x) * 0.05;
      this.position.y += (targetY - this.position.y) * 0.05;
    }

    if (currentAspect < 1.65) {
      // In portrait or narrow screen: calculate exact camera distance Z so the full 1448mm monitor is 100% visible
      // Target visible width: 1540mm (1448mm monitor + comfortable padding of ~46mm on left & right)
      const targetVisibleWidth = 1540;
      const halfFovRad = (currentFov / 2) * (Math.PI / 180);
      const neededZ = (targetVisibleWidth / 2) / (currentAspect * Math.tan(halfFovRad));

      this.position.z = Math.max(this.originPos.z, neededZ);

      // Center camera vertically right at monitor center (Y = 520) in portrait
      const t = Math.min(1, Math.max(0, (currentAspect - 0.5) / 1.15));
      this.position.y = 520 + (this.originPos.y - 520) * t;
      this.focalPoint.y = 520;
    } else {
      // Desktop widescreen
      this.position.z = this.originPos.z;
      this.position.y = this.originPos.y;
      this.focalPoint.y = this.originFoc.y;
    }
  }
}

/**
 * FreeCam Mode: OrbitControls 360 inspection
 */
export class FreeCamKeyframe extends CameraKeyframeInstance {
  constructor() {
    super(new THREE.Vector3(-1100, 800, 1450), new THREE.Vector3(0, 480, 0));
  }
}
