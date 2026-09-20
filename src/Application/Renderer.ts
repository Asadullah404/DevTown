import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Sizes from './Utils/Sizes';
import Camera from './Camera/Camera';

export default class Renderer {
  instance: THREE.WebGLRenderer;
  cssInstance: CSS3DRenderer;
  sizes: Sizes;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  camera: Camera;

  constructor(scene: THREE.Scene, cssScene: THREE.Scene, camera: Camera, sizes: Sizes) {
    this.scene = scene;
    this.cssScene = cssScene;
    this.camera = camera;
    this.sizes = sizes;

    this.initWebGL();
    this.initCSS3D();
  }

  private initWebGL() {
    this.instance = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    
    // Transparent clear color so WebGL canvas punches a hole revealing the CSS3D Windows 11 iframe beneath
    this.instance.setClearColor(0x000000, 0.0);
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.05;

    // Soft realistic shadow maps
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.domElement.style.position = 'absolute';
    this.instance.domElement.style.top = '0px';
    this.instance.domElement.style.left = '0px';
    this.instance.domElement.style.pointerEvents = 'none';

    const webglContainer = document.getElementById('webgl');
    if (webglContainer) {
      webglContainer.appendChild(this.instance.domElement);
    }
  }

  private initCSS3D() {
    this.cssInstance = new CSS3DRenderer();
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);

    this.cssInstance.domElement.style.position = 'absolute';
    this.cssInstance.domElement.style.top = '0px';
    this.cssInstance.domElement.style.left = '0px';

    const cssContainer = document.getElementById('css');
    if (cssContainer) {
      cssContainer.appendChild(this.cssInstance.domElement);
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
    this.cssInstance.render(this.cssScene, this.camera.instance);
  }
}
