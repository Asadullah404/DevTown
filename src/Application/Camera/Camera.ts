import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import BezierEasing from 'bezier-easing';
import EventBus from '../UI/EventBus';
import Sizes from '../Utils/Sizes';
import Mouse from '../Utils/Mouse';
import { CameraKey } from '../../types';
import {
  CameraKeyframeInstance,
  ZoomLevel1Screen,
  ZoomLevel2Table,
  ZoomLevel3Overview,
} from './CameraKeyframes';

export default class Camera {
  instance: THREE.PerspectiveCamera;
  sizes: Sizes;
  mouse: Mouse;
  currentKey: CameraKey = 'zoom3_overview';
  targetKey?: CameraKey;
  position: THREE.Vector3;
  focalPoint: THREE.Vector3;

  keyframes: { [key in CameraKey]?: CameraKeyframeInstance } = {
    zoom3_overview: new ZoomLevel3Overview(),
    zoom2_table: new ZoomLevel2Table(),
    zoom1_screen: new ZoomLevel1Screen(),
  };

  constructor(sizes: Sizes, mouse: Mouse, _domElement: HTMLElement) {
    this.sizes = sizes;
    this.mouse = mouse;

    // Start at Zoom Level 3 (Far away overview)
    this.currentKey = 'zoom3_overview';
    this.position = this.keyframes.zoom3_overview!.position.clone();
    this.focalPoint = this.keyframes.zoom3_overview!.focalPoint.clone();

    this.instance = new THREE.PerspectiveCamera(
      38,
      this.sizes.width / this.sizes.height,
      10,
      100000
    );
    this.instance.position.copy(this.position);
    this.instance.lookAt(this.focalPoint);
    this.updateResponsiveFov();

    this.setupListeners();
  }

  private setupListeners() {
    // When boot completes: Start at Zoom Level 3, then slowly glide to Zoom Level 2
    EventBus.on('bootDone', () => {
      this.currentKey = 'zoom3_overview';
      EventBus.dispatch('zoomLevelChanged', 3);

      setTimeout(() => {
        // Slowly glide into Zoom Level 2 (Full table visible)
        this.transition('zoom2_table', 2600, TWEEN.Easing.Cubic.InOut, () => {
          EventBus.dispatch('zoomLevelChanged', 2);
        });
      }, 900);
    });

    // Hover or click on monitor -> Zoom Level 1 (Max zoom on screen)
    EventBus.on('enterMonitor', () => {
      this.transition('zoom1_screen', 1600, BezierEasing(0.16, 1, 0.3, 1), () => {
        EventBus.dispatch('zoomLevelChanged', 1);
      });
    });

    // Leave monitor -> Return to Zoom Level 2 (Full table)
    EventBus.on('leftMonitor', () => {
      this.transition('zoom2_table', 1400, TWEEN.Easing.Cubic.Out, () => {
        EventBus.dispatch('zoomLevelChanged', 2);
      });
    });

    // Direct zoom level selector from HUD (1, 2, or 3)
    EventBus.on('setZoomLevel', (level: number) => {
      if (level === 1) {
        this.transition('zoom1_screen', 1600, BezierEasing(0.16, 1, 0.3, 1), () => {
          EventBus.dispatch('zoomLevelChanged', 1);
        });
      } else if (level === 2) {
        this.transition('zoom2_table', 1400, TWEEN.Easing.Cubic.Out, () => {
          EventBus.dispatch('zoomLevelChanged', 2);
        });
      } else if (level === 3) {
        this.transition('zoom3_overview', 1800, TWEEN.Easing.Cubic.InOut, () => {
          EventBus.dispatch('zoomLevelChanged', 3);
        });
      }
    });

    // Click or tap outside desk to toggle between Zoom 2 (table) and Zoom 3 (far overview)
    const handleTapOutside = (target: HTMLElement | null) => {
      if (
        target &&
        (target.id === 'prevent-click' ||
          target.closest('#prevent-click') ||
          target.closest('#ui-interactive'))
      ) {
        return;
      }

      if (this.currentKey === 'zoom1_screen') {
        this.transition('zoom2_table', 1400, TWEEN.Easing.Cubic.Out, () => {
          EventBus.dispatch('zoomLevelChanged', 2);
        });
      } else if (this.currentKey === 'zoom2_table') {
        this.transition('zoom3_overview', 1800, TWEEN.Easing.Cubic.InOut, () => {
          EventBus.dispatch('zoomLevelChanged', 3);
        });
      } else if (this.currentKey === 'zoom3_overview') {
        this.transition('zoom2_table', 1800, TWEEN.Easing.Cubic.InOut, () => {
          EventBus.dispatch('zoomLevelChanged', 2);
        });
      }
    };

    document.addEventListener('mousedown', (e: MouseEvent) => {
      handleTapOutside(e.target as HTMLElement);
    });

    let touchStartTime = 0;
    document.addEventListener('touchstart', () => {
      touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', (e: TouchEvent) => {
      if (Date.now() - touchStartTime < 300) {
        handleTapOutside(e.target as HTMLElement);
      }
    }, { passive: true });

    EventBus.on('resize', ({ width, height }) => {
      this.instance.aspect = width / height;
      this.updateResponsiveFov();
      const currentFrame = this.keyframes[this.currentKey];
      if (currentFrame) {
        currentFrame.update(this.mouse, width / height, this.instance.fov);
        if (!this.targetKey) {
          this.position.copy(currentFrame.position);
          this.focalPoint.copy(currentFrame.focalPoint);
        }
      }
    });
  }

  private updateResponsiveFov() {
    const aspect = this.sizes.width / this.sizes.height;
    if (aspect < 0.75) {
      // Tall portrait phone (e.g. 9:19.5): broaden FOV so full workstation and desk are framed
      this.instance.fov = 54;
    } else if (aspect < 1.0) {
      // Standard portrait phone / tablet
      this.instance.fov = 48;
    } else if (aspect < 1.4) {
      // Square or narrow landscape
      this.instance.fov = 42;
    } else {
      // Desktop widescreen (16:9 or ultrawide)
      this.instance.fov = 38;
    }
    this.instance.updateProjectionMatrix();
  }

  transition(
    key: CameraKey,
    duration: number = 1200,
    easing: any = TWEEN.Easing.Cubic.InOut,
    callback?: () => void
  ) {
    if (this.currentKey === key && !this.targetKey) return;

    TWEEN.removeAll();
    this.targetKey = key;

    const targetFrame = this.keyframes[key];
    if (!targetFrame) return;

    // Calculate responsive position and focal point before beginning tween
    targetFrame.update(undefined, this.sizes.width / this.sizes.height, this.instance.fov);

    new TWEEN.Tween(this.position)
      .to(targetFrame.position, duration)
      .easing(easing)
      .onComplete(() => {
        this.currentKey = key;
        this.targetKey = undefined;
        if (callback) callback();
      })
      .start();

    new TWEEN.Tween(this.focalPoint)
      .to(targetFrame.focalPoint, duration)
      .easing(easing)
      .start();
  }

  update() {
    TWEEN.update();

    const currentFrame = this.keyframes[this.currentKey];
    if (currentFrame) {
      currentFrame.update(this.mouse, this.sizes.width / this.sizes.height, this.instance.fov);
      if (!this.targetKey) {
        this.position.copy(currentFrame.position);
        this.focalPoint.copy(currentFrame.focalPoint);
      }
    }

    this.instance.position.copy(this.position);
    this.instance.lookAt(this.focalPoint);
  }
}
