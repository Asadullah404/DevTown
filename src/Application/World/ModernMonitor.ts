import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import EventBus from '../UI/EventBus';
import { TextureGenerator } from '../Utils/TextureGenerator';
import { GeometryUtils } from '../Utils/GeometryUtils';

export const SCREEN_CONFIG = {
  width: 1440,
  height: 810, // 16:9 widescreen
  position: new THREE.Vector3(0, 520, 0),
  rotation: new THREE.Euler(0, 0, 0),
};

export default class ModernMonitor {
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  monitorGroup: THREE.Group;
  cssObject: CSS3DObject;
  glOcclusionPlane: THREE.Mesh;
  glassMesh: THREE.Mesh;
  innerShadowMesh: THREE.Mesh;
  glassMaterial: THREE.MeshBasicMaterial;
  innerShadowMaterial: THREE.MeshBasicMaterial;
  inScreen: boolean = false;
  isMouseDown: boolean = false;

  constructor(scene: THREE.Scene, cssScene: THREE.Scene) {
    this.scene = scene;
    this.cssScene = cssScene;
    this.monitorGroup = new THREE.Group();

    this.build3DHardware();
    this.createScreenIframe();
    this.createGLOcclusionPlane();
    this.createGlassReflectionAndInnerShadow();

    this.scene.add(this.monitorGroup);
    this.setupEventListeners();
  }

  private build3DHardware() {
    const { width, height, position } = SCREEN_CONFIG;
    const bezelThickness = 4;
    const monitorDepth = 18;

    // Materials: Apple Studio Display / High-End Studio Monitor Style
    const brushedMetal = TextureGenerator.createBrushedMetalTexture();
    const brushedNormal = TextureGenerator.createBrushedMetalNormalMap();
    const aluminumMaterial = new THREE.MeshPhysicalMaterial({
      map: brushedMetal,
      normalMap: brushedNormal,
      normalScale: new THREE.Vector2(0.12, 0.12),
      color: 0xa8b0bc, // Brushed Apple Space Silver
      roughness: 0.22,
      metalness: 0.95,
      clearcoat: 0.25,
      clearcoatRoughness: 0.15,
      envMapIntensity: 0.9,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.2,
      metalness: 0.8,
    });

    const cameraLensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      transparent: true,
    });

    // 1. Unibody Aluminum Enclosure (Back Housing with Smooth Rounded 14mm Corners)
    const backPanelGeo = GeometryUtils.createRoundedBox(
      width + bezelThickness * 2,
      height + bezelThickness * 2,
      monitorDepth,
      14,
      4
    );
    const backPanel = new THREE.Mesh(backPanelGeo, aluminumMaterial);
    backPanel.position.set(0, 0, -monitorDepth / 2 - 1);
    backPanel.castShadow = true;
    this.monitorGroup.add(backPanel);

    // 2. Micro-Edge Bezel Trim
    // Top border
    const topBorder = new THREE.Mesh(
      new THREE.BoxGeometry(width + bezelThickness * 2, bezelThickness, monitorDepth),
      darkTrimMaterial
    );
    topBorder.position.set(0, height / 2 + bezelThickness / 2, 0);
    this.monitorGroup.add(topBorder);

    // Bottom chin border
    const bottomBorder = new THREE.Mesh(
      new THREE.BoxGeometry(width + bezelThickness * 2, bezelThickness * 2, monitorDepth),
      darkTrimMaterial
    );
    bottomBorder.position.set(0, -height / 2 - bezelThickness, 0);
    this.monitorGroup.add(bottomBorder);

    // Left border
    const leftBorder = new THREE.Mesh(
      new THREE.BoxGeometry(bezelThickness, height, monitorDepth),
      darkTrimMaterial
    );
    leftBorder.position.set(-width / 2 - bezelThickness / 2, 0, 0);
    this.monitorGroup.add(leftBorder);

    // Right border
    const rightBorder = new THREE.Mesh(
      new THREE.BoxGeometry(bezelThickness, height, monitorDepth),
      darkTrimMaterial
    );
    rightBorder.position.set(width / 2 + bezelThickness / 2, 0, 0);
    this.monitorGroup.add(rightBorder);

    // Top Center HD Webcam Dot
    const webcam = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3, 24), cameraLensMaterial);
    webcam.rotation.x = Math.PI / 2;
    webcam.position.set(0, height / 2 + bezelThickness / 2, monitorDepth / 2 + 0.5);
    this.monitorGroup.add(webcam);

    // Tiny green camera active indicator pinhole LED
    const camLed = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    camLed.position.set(12, height / 2 + bezelThickness / 2, monitorDepth / 2 + 0.6);
    this.monitorGroup.add(camLed);

    // 3. Cantilever Ergonomic Aluminum Stand
    // Stand Hinge mechanism at back of monitor
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 70, 32), aluminumMaterial);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0, -monitorDepth - 20);
    this.monitorGroup.add(hinge);

    // Upright Stem with Smooth Filleted Edges
    const standNeck = new THREE.Mesh(
      GeometryUtils.createRoundedBox(85, 460, 26, 8, 4),
      aluminumMaterial
    );
    standNeck.position.set(0, -220, -monitorDepth - 45);
    standNeck.rotation.x = -0.04;
    standNeck.castShadow = true;
    this.monitorGroup.add(standNeck);

    // Oval cable pass-through hole inside stand neck
    const cableHoleTrim = new THREE.Mesh(
      new THREE.CylinderGeometry(24, 24, 30, 32),
      new THREE.MeshStandardMaterial({ color: 0x22242e, roughness: 0.5 })
    );
    cableHoleTrim.rotation.x = Math.PI / 2;
    cableHoleTrim.position.set(0, -260, -monitorDepth - 45);
    this.monitorGroup.add(cableHoleTrim);

    // Solid Brushed Aluminum Base Plate with Smooth 18mm Rounded Corners and Bevel
    const basePlate = new THREE.Mesh(
      GeometryUtils.createRoundedBox(430, 10, 270, 18, 5),
      aluminumMaterial
    );
    basePlate.position.set(0, -height / 2 - 70, -20);
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    this.monitorGroup.add(basePlate);

    // Position entire monitor group
    this.monitorGroup.position.copy(position);
  }

  private createScreenIframe() {
    const { width, height, position, rotation } = SCREEN_CONFIG;

    // Create wrapper container
    const container = document.createElement('div');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.backgroundColor = '#0c0e14';
    container.className = 'screen-frame';

    // Create iframe loading the compiled Windows 11 app
    const iframe = document.createElement('iframe');
    iframe.src = './os/index.html';
    iframe.id = 'computer-screen';
    iframe.title = 'Windows 11 Workstation';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    container.appendChild(iframe);

    this.cssObject = new CSS3DObject(container);
    this.cssObject.position.copy(position);
    this.cssObject.rotation.copy(rotation);

    this.cssScene.add(this.cssObject);
  }

  private createGLOcclusionPlane() {
    const { width, height, position, rotation } = SCREEN_CONFIG;

    // GL Occlusion plane: pure black basic material with NoBlending writes strictly (0,0,0,0) to color buffer
    // and writes proper depth to depth buffer, perfectly occluding 3D meshes without grey-washing the iframe
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.NoBlending,
    });

    const geometry = new THREE.PlaneGeometry(width, height);
    this.glOcclusionPlane = new THREE.Mesh(geometry, material);
    this.glOcclusionPlane.position.copy(position);
    this.glOcclusionPlane.rotation.copy(rotation);

    this.scene.add(this.glOcclusionPlane);
  }

  private createGlassReflectionAndInnerShadow() {
    const { width, height, position, rotation } = SCREEN_CONFIG;

    // 1. Realistic Glass Reflection Layer: soft window specular sheen across the screen
    const glassTexture = TextureGenerator.createGlassReflectionTexture(width, height);
    this.glassMaterial = new THREE.MeshBasicMaterial({
      map: glassTexture,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const glassGeo = new THREE.PlaneGeometry(width, height);
    this.glassMesh = new THREE.Mesh(glassGeo, this.glassMaterial);
    // Positioned slightly in front of the screen plane (recessed inside the aluminum bezel)
    this.glassMesh.position.set(position.x, position.y, position.z + 1.2);
    this.glassMesh.rotation.copy(rotation);
    this.scene.add(this.glassMesh);

    // 2. Bezel Inner Shadow / Inset Depth: frames the glass with realistic physical shadow
    const innerShadowTexture = TextureGenerator.createMonitorInnerShadowTexture(width, height);
    this.innerShadowMaterial = new THREE.MeshBasicMaterial({
      map: innerShadowTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const shadowGeo = new THREE.PlaneGeometry(width, height);
    this.innerShadowMesh = new THREE.Mesh(shadowGeo, this.innerShadowMaterial);
    this.innerShadowMesh.position.set(position.x, position.y, position.z + 1.5);
    this.innerShadowMesh.rotation.copy(rotation);
    this.scene.add(this.innerShadowMesh);
  }

  update(camera: THREE.Camera, mouse?: { normalizedX: number; normalizedY: number }) {
    if (!this.glassMaterial) return;

    // Calculate distance from camera to monitor center
    const dist = camera.position.distanceTo(SCREEN_CONFIG.position);

    // Smoothly adjust glass reflection based on camera zoom distance:
    // - Level 3 Overview (dist ~ 3350): opacity ~ 0.22 (real glass catching room window light)
    // - Level 2 Setup (dist ~ 2230): opacity ~ 0.14 (subtle glass depth)
    // - Level 1 Screen (dist ~ 1345): opacity ~ 0.04 (crystal clear, vibrant desktop)
    const t = THREE.MathUtils.clamp((dist - 1300) / (3300 - 1300), 0, 1);
    const targetOpacity = THREE.MathUtils.lerp(0.04, 0.22, t);
    this.glassMaterial.opacity = THREE.MathUtils.lerp(this.glassMaterial.opacity, targetOpacity, 0.08);

    // Subtle specular parallax highlight shift when mouse moves across workspace
    if (mouse && this.glassMesh) {
      const targetX = SCREEN_CONFIG.position.x + mouse.normalizedX * 12;
      const targetY = SCREEN_CONFIG.position.y + mouse.normalizedY * 6;
      this.glassMesh.position.x += (targetX - this.glassMesh.position.x) * 0.05;
      this.glassMesh.position.y += (targetY - this.glassMesh.position.y) * 0.05;
    }
  }

  private setupEventListeners() {
    // Listen to messages from inner Windows 11 iframe
    window.addEventListener('message', (event) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'mousemove' || event.data.type === 'touchstart' || event.data.type === 'touchmove') {
        if (!this.inScreen) {
          this.inScreen = true;
          EventBus.dispatch('enterMonitor');
        }
      } else if (event.data.type === 'mousedown') {
        this.isMouseDown = true;
      } else if (event.data.type === 'mouseup' || event.data.type === 'touchend') {
        this.isMouseDown = false;
      }
    });

    // Detect when mouse/touch enters the monitor screen area
    document.addEventListener('mousemove', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.id === 'computer-screen') {
        if (!this.inScreen) {
          this.inScreen = true;
          EventBus.dispatch('enterMonitor');
        }
      } else if (this.inScreen && !this.isMouseDown) {
        // If mouse left the screen and not currently dragging
        this.inScreen = false;
        EventBus.dispatch('leftMonitor');
      }
    });

    document.addEventListener('touchstart', (e) => {
      const target = e.target as HTMLElement;
      if (target && (target.id === 'computer-screen' || target.closest('.screen-frame'))) {
        if (!this.inScreen) {
          this.inScreen = true;
          EventBus.dispatch('enterMonitor');
        }
      }
    }, { passive: true });
  }
}
