import * as THREE from 'three';
import CoffeeSteam from './CoffeeSteam';
import { TextureGenerator } from '../Utils/TextureGenerator';
import { GeometryUtils } from '../Utils/GeometryUtils';

export default class ModernWorkstation {
  scene: THREE.Scene;
  group: THREE.Group;
  coffeeSteam: CoffeeSteam;

  // Shared high-definition textures & normal maps
  private woodTexture: THREE.CanvasTexture;
  private woodNormal: THREE.CanvasTexture;
  private woodRoughness: THREE.CanvasTexture;
  private brushedMetalTexture: THREE.CanvasTexture;
  private brushedMetalNormal: THREE.CanvasTexture;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    // 1. Initialize Realistic Cubemap Environment Map for PBR reflections
    this.initEnvironmentMap();

    // 2. Pre-generate shared high-def textures and normal maps
    this.woodTexture = TextureGenerator.createWoodTexture();
    this.woodNormal = TextureGenerator.createWoodNormalMap();
    this.woodRoughness = TextureGenerator.createWoodRoughnessMap();
    this.brushedMetalTexture = TextureGenerator.createBrushedMetalTexture();
    this.brushedMetalNormal = TextureGenerator.createBrushedMetalNormalMap();

    this.createRoom();
    this.createDesk();
    this.createDeskMat();
    this.createPCTower();
    this.createKeyboard();
    this.createMouse();
    this.createSpeakers();
    this.createChair();
    this.createWallArtAndShelf();
    this.createDeskAccessories();
    this.createLighting();

    this.scene.add(this.group);
  }

  private initEnvironmentMap() {
    try {
      const cubeLoader = new THREE.CubeTextureLoader();
      cubeLoader.setPath('/textures/environmentMap/');
      const envMap = cubeLoader.load(
        ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
        () => {
          this.scene.environment = envMap;
        },
        undefined,
        (err) => {
          console.warn('Environment map load error:', err);
        }
      );
      this.scene.environment = envMap;
    } catch (e) {
      console.warn('Could not initialize environment map:', e);
    }
  }

  private createRoom() {
    // 1. Floor: Scandinavian Wide-Plank Oak with Normal Map & Micro-Bevels
    const floorGeo = new THREE.PlaneGeometry(7000, 7000);
    const floorTexture = TextureGenerator.createFloorTexture();
    const floorNormal = TextureGenerator.createFloorNormalMap();
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      normalMap: floorNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.42,
      metalness: 0.05,
      envMapIntensity: 0.35,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -450;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Back Wall: Warm Minimalist Architectural Off-White Plaster with Normal Relief
    const wallTexture = TextureGenerator.createWallTexture();
    const wallNormal = TextureGenerator.createWallNormalMap();
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTexture,
      normalMap: wallNormal,
      normalScale: new THREE.Vector2(0.25, 0.25),
      roughness: 0.85,
      metalness: 0.02,
      envMapIntensity: 0.2,
    });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(7000, 3600), wallMat);
    backWall.position.set(0, 1350, -850);
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // Architectural White Baseboard along back wall
    const baseboardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1,
    });
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(7000, 50, 16), baseboardMat);
    baseboard.position.set(0, -425, -842);
    this.group.add(baseboard);

    // 3. Left Wall with Large Architectural Studio Window
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(6000, 3600), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-2800, 1350, 500);
    leftWall.receiveShadow = true;
    this.group.add(leftWall);

    // Window View Backdrop (Morning daylight city skyline)
    const windowViewTexture = TextureGenerator.createWindowViewTexture();
    const viewMat = new THREE.MeshBasicMaterial({ map: windowViewTexture });
    const windowBackdrop = new THREE.Mesh(new THREE.PlaneGeometry(2400, 2600), viewMat);
    windowBackdrop.rotation.y = Math.PI / 2;
    windowBackdrop.position.set(-2790, 1200, -50);
    this.group.add(windowBackdrop);

    // Modern Matte Black Architectural Window Frames
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.3,
      metalness: 0.8,
      envMapIntensity: 0.7,
    });

    const winOuter = new THREE.Mesh(new THREE.BoxGeometry(20, 2640, 2440), frameMat);
    winOuter.position.set(-2780, 1200, -50);
    this.group.add(winOuter);

    // Window glass mullions
    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(24, 2600, 20), frameMat);
    mullionV.position.set(-2775, 1200, -50);
    this.group.add(mullionV);

    const mullionH1 = new THREE.Mesh(new THREE.BoxGeometry(24, 20, 2400), frameMat);
    mullionH1.position.set(-2775, 1200, -50);
    this.group.add(mullionH1);

    // 4. Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.9,
    });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(7000, 7000), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3150;
    this.group.add(ceiling);
  }

  private createDesk() {
    // Solid Natural Light Oak Tabletop with 16mm Filleted Edges & HD Wood Normal + Roughness Maps
    const topGeo = GeometryUtils.createRoundedBox(2400, 42, 920, 16, 4);
    const topMat = new THREE.MeshPhysicalMaterial({
      map: this.woodTexture,
      normalMap: this.woodNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      roughnessMap: this.woodRoughness,
      roughness: 0.32,
      metalness: 0.04,
      clearcoat: 0.25,
      clearcoatRoughness: 0.15,
      envMapIntensity: 0.5,
    });
    const tabletop = new THREE.Mesh(topGeo, topMat);
    tabletop.position.set(0, 0, 0);
    tabletop.castShadow = true;
    tabletop.receiveShadow = true;
    this.group.add(tabletop);

    // Sleek Motorized Standing Desk Legs (Matte Anthracite Precision CNC Aluminum)
    const legMat = new THREE.MeshPhysicalMaterial({
      map: this.brushedMetalTexture,
      normalMap: this.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.12, 0.12),
      color: 0x1c1e24,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.1,
      envMapIntensity: 0.7,
    });

    const colGeo = GeometryUtils.createRoundedBox(65, 430, 90, 8, 3);
    const footGeo = GeometryUtils.createRoundedBox(85, 24, 680, 10, 3);

    // Left Column & Foot
    const leftCol = new THREE.Mesh(colGeo, legMat);
    leftCol.position.set(-950, -225, 0);
    leftCol.castShadow = true;
    this.group.add(leftCol);

    const leftFoot = new THREE.Mesh(footGeo, legMat);
    leftFoot.position.set(-950, -438, 0);
    leftFoot.castShadow = true;
    this.group.add(leftFoot);

    // Right Column & Foot
    const rightCol = new THREE.Mesh(colGeo, legMat);
    rightCol.position.set(950, -225, 0);
    rightCol.castShadow = true;
    this.group.add(rightCol);

    const rightFoot = new THREE.Mesh(footGeo, legMat);
    rightFoot.position.set(950, -438, 0);
    rightFoot.castShadow = true;
    this.group.add(rightFoot);

    // Cable Management Tray with rounded filleted corners
    const cableTray = new THREE.Mesh(GeometryUtils.createRoundedBox(1500, 70, 160, 12, 3), legMat);
    cableTray.position.set(0, -60, -250);
    this.group.add(cableTray);
  }

  private createDeskMat() {
    // Ultra-smooth Pebbled Italian Full-Grain Leather Desk Mat with Saddle Stitching & Normal Map
    const matGeo = GeometryUtils.createRoundedBox(1050, 4, 440, 22, 4);
    const matTexture = TextureGenerator.createDeskMatTexture();
    const matNormal = TextureGenerator.createDeskMatNormalMap();
    const matMat = new THREE.MeshPhysicalMaterial({
      map: matTexture,
      normalMap: matNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      roughness: 0.65,
      metalness: 0.08,
      clearcoat: 0.12,
      envMapIntensity: 0.35,
    });
    const deskMat = new THREE.Mesh(matGeo, matMat);
    deskMat.position.set(0, 23, 170);
    deskMat.receiveShadow = true;
    this.group.add(deskMat);
  }

  private createPCTower() {
    // Fractal North Style Minimalist Chassis with Real Oak Slats & Turned Brass Feet
    const towerGroup = new THREE.Group();

    const caseMat = new THREE.MeshPhysicalMaterial({
      map: this.brushedMetalTexture,
      normalMap: this.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.18, 0.18),
      color: 0x14161d,
      roughness: 0.28,
      metalness: 0.85,
      clearcoat: 0.15,
      envMapIntensity: 0.85,
    });

    const woodSlatMat = new THREE.MeshPhysicalMaterial({
      map: this.woodTexture,
      normalMap: this.woodNormal,
      normalScale: new THREE.Vector2(0.3, 0.3),
      roughness: 0.35,
      metalness: 0.02,
      clearcoat: 0.15,
      envMapIntensity: 0.4,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      transmission: 0.88,
      transparent: true,
      roughness: 0.04,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.0,
    });

    // Main Case Body with 14mm Silky Smooth Fillets
    const chassis = new THREE.Mesh(GeometryUtils.createRoundedBox(220, 460, 460, 14, 4), caseMat);
    chassis.castShadow = true;
    towerGroup.add(chassis);

    // Front Panel with Vertical Rounded Pill-Shaped Oak Slats
    const slatGeo = GeometryUtils.createRoundedBox(12, 430, 8, 3, 2);
    for (let x = -85; x <= 85; x += 22) {
      const slat = new THREE.Mesh(slatGeo, woodSlatMat);
      slat.position.set(x, 0, 234);
      towerGroup.add(slat);
    }

    // Precision CNC Turned Brass Isolation Feet
    const footMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.95,
      envMapIntensity: 1.2,
    });
    [-85, 85].forEach((fx) => {
      [-180, 180].forEach((fz) => {
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(12, 14, 16, 24), footMat);
        foot.position.set(fx, -238, fz);
        towerGroup.add(foot);
      });
    });

    // Glass Side Panel with Soft Beveled Corners
    const glass = new THREE.Mesh(GeometryUtils.createRoundedBox(4, 440, 440, 8, 2), glassMat);
    glass.position.set(-112, 0, 0);
    towerGroup.add(glass);

    // Warm Interior Ambient Glow (Golden amber / warm white)
    const interiorLed = new THREE.PointLight(0xffedd5, 1.2, 350);
    interiorLed.position.set(-30, 40, 20);
    towerGroup.add(interiorLed);

    // Minimalist CPU Cooler with Warm Illuminated Ring
    const coolerRing = new THREE.Mesh(
      new THREE.TorusGeometry(32, 4, 16, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    coolerRing.rotation.y = Math.PI / 2;
    coolerRing.position.set(-20, 80, -20);
    towerGroup.add(coolerRing);

    // Clean GPU Backplate with Filleted Edges
    const gpuBackplate = new THREE.Mesh(
      GeometryUtils.createRoundedBox(80, 12, 280, 4, 2),
      new THREE.MeshStandardMaterial({
        color: 0x222634,
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 0.8,
      })
    );
    gpuBackplate.position.set(-20, -30, 10);
    towerGroup.add(gpuBackplate);

    towerGroup.position.set(1040, 252, 20);
    this.group.add(towerGroup);
  }

  private createKeyboard() {
    const kbGroup = new THREE.Group();
    const chassisMat = new THREE.MeshPhysicalMaterial({
      map: this.brushedMetalTexture,
      normalMap: this.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.15, 0.15),
      color: 0x20242f,
      roughness: 0.22,
      metalness: 0.85,
      clearcoat: 0.2,
      envMapIntensity: 0.75,
    });

    const creamKeyMat = new THREE.MeshPhysicalMaterial({
      color: 0xede8dc,
      roughness: 0.32,
      clearcoat: 0.1,
    });

    const darkKeyMat = new THREE.MeshPhysicalMaterial({
      color: 0x2d323f,
      roughness: 0.32,
      clearcoat: 0.1,
    });

    // CNC Anodized Aluminum Keyboard Angled Base with 10mm Filleted Edges
    const base = new THREE.Mesh(GeometryUtils.createRoundedBox(350, 16, 136, 10, 3), chassisMat);
    base.rotation.x = 0.08;
    base.castShadow = true;
    kbGroup.add(base);

    // Sculpted Spherical Keycaps with 2.5mm Rounded Radii
    const keyGeo = GeometryUtils.createRoundedBox(18, 9, 18, 2.5, 2);
    const spacebarGeo = GeometryUtils.createRoundedBox(108, 9, 18, 2.5, 2);

    for (let r = -48; r <= 48; r += 24) {
      if (r === 48) {
        // Bottom row with wide spacebar in center
        const space = new THREE.Mesh(spacebarGeo, creamKeyMat);
        space.position.set(0, 13, r);
        kbGroup.add(space);

        [-155, -133, -111, -89, 89, 111, 133, 155].forEach((c) => {
          const key = new THREE.Mesh(keyGeo, darkKeyMat);
          key.position.set(c, 13, r);
          kbGroup.add(key);
        });
      } else {
        for (let c = -155; c <= 155; c += 22) {
          const isModifier = Math.abs(c) > 130;
          const key = new THREE.Mesh(keyGeo, isModifier ? darkKeyMat : creamKeyMat);
          key.position.set(c, 13, r);
          kbGroup.add(key);
        }
      }
    }

    // Coiled Aviator Cable connecting to PC with Knurled Metal Quick-Disconnect
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.55 });
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 260, 24), cableMat);
    cable.rotation.z = Math.PI / 2;
    cable.position.set(130, 10, -78);
    kbGroup.add(cable);

    const couplingMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95,
      envMapIntensity: 1.1,
    });
    const coupling = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 16, 24), couplingMat);
    coupling.rotation.z = Math.PI / 2;
    coupling.position.set(130, 10, -78);
    kbGroup.add(coupling);

    kbGroup.position.set(-80, 31, 235);
    this.group.add(kbGroup);
  }

  private createMouse() {
    const mouseGroup = new THREE.Group();
    const mouseMat = new THREE.MeshPhysicalMaterial({
      color: 0x181a24,
      roughness: 0.3,
      metalness: 0.35,
      clearcoat: 0.15,
      envMapIntensity: 0.6,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.92,
      envMapIntensity: 1.2,
    });

    // Sculpted Ergonomic Body with Smooth Palm Crest
    const body = new THREE.Mesh(GeometryUtils.createRoundedBox(58, 28, 108, 14, 4), mouseMat);
    body.position.set(0, 5, 0);
    body.castShadow = true;
    mouseGroup.add(body);

    // Flared Ergonomic Thumb Rest Wing with Rounded Edges
    const wing = new THREE.Mesh(GeometryUtils.createRoundedBox(18, 5, 54, 2.5, 2), mouseMat);
    wing.position.set(-28, -6, 8);
    mouseGroup.add(wing);

    // Precision CNC Brass/Silver Scroll Wheel
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 6, 24), brassMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(0, 16, -26);
    mouseGroup.add(wheel);

    // Smooth PTFE Glide Skates Underneath
    const skateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    [-34, 34].forEach((sz) => {
      const skate = new THREE.Mesh(GeometryUtils.createRoundedBox(38, 1.5, 16, 3, 2), skateMat);
      skate.position.set(0, -9, sz);
      mouseGroup.add(skate);
    });

    mouseGroup.position.set(270, 32, 245);
    this.group.add(mouseGroup);
  }

  private createSpeakers() {
    // Minimalist Studio Monitors with Kevlar Coaxial Driver & Filleted Cabinets
    const speakerMat = new THREE.MeshPhysicalMaterial({
      color: 0x181a22,
      roughness: 0.22,
      metalness: 0.45,
      clearcoat: 0.35,
      clearcoatRoughness: 0.12,
      envMapIntensity: 0.75,
    });

    const coneTexture = TextureGenerator.createSpeakerConeTexture();
    const wooferMat = new THREE.MeshStandardMaterial({
      map: coneTexture,
      roughness: 0.35,
      metalness: 0.65,
      envMapIntensity: 0.6,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95,
      envMapIntensity: 1.1,
    });

    const isolationMat = new THREE.MeshStandardMaterial({
      color: 0x0f1117,
      roughness: 0.85,
    });

    const boxGeo = GeometryUtils.createRoundedBox(130, 230, 150, 16, 4);
    const riserGeo = GeometryUtils.createRoundedBox(120, 16, 140, 6, 3);

    [-815, 815].forEach((x) => {
      const speaker = new THREE.Group();
      // Silky Curved Acoustic Cabinet with 16mm Fillets
      const box = new THREE.Mesh(boxGeo, speakerMat);
      box.castShadow = true;
      speaker.add(box);

      // Outer Aluminum Waveguide Trim Ring
      const waveguide = new THREE.Mesh(new THREE.TorusGeometry(38, 3.5, 16, 32), trimMat);
      waveguide.position.set(0, -20, 75);
      speaker.add(waveguide);

      // Amber Kevlar Woven Acoustic Driver Cone
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(34, 16, 12, 32), wooferMat);
      cone.rotation.x = Math.PI / 2;
      cone.position.set(0, -20, 75);
      speaker.add(cone);

      // Tangerine Tweeter Waveguide Center Dome
      const tweeter = new THREE.Mesh(new THREE.SphereGeometry(10, 24, 24), trimMat);
      tweeter.position.set(0, -20, 80);
      speaker.add(tweeter);

      // Acoustic Isolation Wedge Riser (Angled upward toward listener's ears)
      const riser = new THREE.Mesh(riserGeo, isolationMat);
      riser.position.set(0, -122, 0);
      riser.rotation.x = -0.06;
      speaker.add(riser);

      speaker.rotation.y = x < 0 ? 0.28 : -0.28;
      speaker.position.set(x, 140, -40);
      this.group.add(speaker);
    });
  }

  private createChair() {
    // Modern Designer Ergonomic Mesh Chair (Aeron Style with Pellicle Mesh Texture)
    const chairGroup = new THREE.Group();
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1d24,
      roughness: 0.28,
      metalness: 0.85,
      clearcoat: 0.2,
      envMapIntensity: 0.8,
    });

    const meshTexture = TextureGenerator.createAeronMeshTexture();
    const meshMat = new THREE.MeshPhysicalMaterial({
      map: meshTexture,
      color: 0x222733,
      roughness: 0.65,
      metalness: 0.15,
      clearcoat: 0.1,
      envMapIntensity: 0.4,
    });

    // Waterfall Contoured Seat Cushion with 20mm Fillets
    const seat = new THREE.Mesh(GeometryUtils.createRoundedBox(460, 44, 440, 20, 4), meshMat);
    seat.position.set(0, 20, 0);
    seat.castShadow = true;
    chairGroup.add(seat);

    // Contoured Ergonomic Backrest with Lumbar Curve
    const back = new THREE.Mesh(GeometryUtils.createRoundedBox(430, 480, 36, 20, 4), meshMat);
    back.position.set(0, 280, 210);
    back.rotation.x = -0.1;
    back.castShadow = true;
    chairGroup.add(back);

    // Smooth Pill Armrests with Rounded Pads
    const armPadGeo = GeometryUtils.createRoundedBox(52, 20, 220, 10, 3);
    [-240, 240].forEach((x) => {
      const armSupport = new THREE.Mesh(new THREE.CylinderGeometry(10, 12, 160, 16), frameMat);
      armSupport.position.set(x, 100, 20);
      chairGroup.add(armSupport);

      const armPad = new THREE.Mesh(armPadGeo, frameMat);
      armPad.position.set(x, 185, 20);
      chairGroup.add(armPad);
    });

    // Precision Gas Lift Cylinder
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(18, 22, 250, 24), frameMat);
    cylinder.position.set(0, -120, 0);
    chairGroup.add(cylinder);

    // 5-Star Arched Base with Radiating Arms and Smooth Casters
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const legArm = new THREE.Mesh(new THREE.CylinderGeometry(9, 14, 270, 16), frameMat);
      legArm.rotation.z = Math.PI / 2;
      legArm.rotation.y = angle;
      legArm.position.set(Math.cos(angle) * 135, -245, Math.sin(angle) * 135);
      chairGroup.add(legArm);

      const caster = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 16), frameMat);
      caster.position.set(Math.cos(angle) * 265, -255, Math.sin(angle) * 265);
      chairGroup.add(caster);
    }

    chairGroup.position.set(0, -180, 680);
    this.group.add(chairGroup);
  }

  private createWallArtAndShelf() {
    // 1. Framed Bauhaus Minimalist Art Piece with Rounded Oak Frame
    const artGroup = new THREE.Group();

    // Natural Oak Picture Frame with Wood Texture & Normal Map
    const frameMat = new THREE.MeshPhysicalMaterial({
      map: this.woodTexture,
      normalMap: this.woodNormal,
      normalScale: new THREE.Vector2(0.3, 0.3),
      roughness: 0.32,
      metalness: 0.05,
      clearcoat: 0.2,
      envMapIntensity: 0.5,
    });

    const frame = new THREE.Mesh(
      GeometryUtils.createRoundedBox(650, 880, 22, 10, 3),
      frameMat
    );
    frame.position.set(0, 0, -12);
    artGroup.add(frame);

    // Modern Minimalist Bauhaus Architectural Canvas Print
    const artTexture = TextureGenerator.createArtTexture();
    const artMat = new THREE.MeshStandardMaterial({
      map: artTexture,
      roughness: 0.35,
      metalness: 0.05,
    });
    const canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(620, 850), artMat);
    canvasMesh.position.set(0, 0, 0);
    artGroup.add(canvasMesh);

    // Protective Museum Art Glazing (Glass with physical reflections)
    const glassCoverMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      transparent: true,
      roughness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.0,
    });
    const glassCover = new THREE.Mesh(new THREE.PlaneGeometry(620, 850), glassCoverMat);
    glassCover.position.set(0, 0, 2);
    artGroup.add(glassCover);

    artGroup.position.set(-300, 1380, -840);
    this.group.add(artGroup);

    // 2. Floating Natural Oak Shelf with 10mm Smooth Bullnose Edges & HD Wood Maps
    const shelfMat = new THREE.MeshPhysicalMaterial({
      map: this.woodTexture,
      normalMap: this.woodNormal,
      normalScale: new THREE.Vector2(0.3, 0.3),
      roughness: 0.35,
      metalness: 0.02,
      clearcoat: 0.15,
      envMapIntensity: 0.5,
    });
    const shelf = new THREE.Mesh(GeometryUtils.createRoundedBox(950, 28, 240, 10, 3), shelfMat);
    shelf.position.set(580, 1250, -730);
    shelf.castShadow = true;
    this.group.add(shelf);

    // Items on the shelf: Hardcover design books with smooth filleted spines
    const bookColors = [0x1e293b, 0xd97706, 0x059669];
    const bookGeo = GeometryUtils.createRoundedBox(140, 24, 180, 4, 2);
    bookColors.forEach((color, i) => {
      const book = new THREE.Mesh(
        bookGeo,
        new THREE.MeshStandardMaterial({ color, roughness: 0.45, envMapIntensity: 0.4 })
      );
      book.position.set(420 + i * 8, 1276 + i * 26, -720);
      this.group.add(book);
    });

    // Potted plant on shelf with trailing vine
    const shelfPot = new THREE.Mesh(
      new THREE.CylinderGeometry(35, 26, 65, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.2,
        clearcoat: 0.4,
        envMapIntensity: 0.7,
      })
    );
    shelfPot.position.set(880, 1295, -730);
    this.group.add(shelfPot);

    const plantMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 });
    for (let j = 0; j < 7; j++) {
      const vineLeaf = new THREE.Mesh(new THREE.SphereGeometry(14, 12, 12), plantMat);
      vineLeaf.scale.set(1, 0.4, 1.2);
      vineLeaf.position.set(880 + (Math.random() - 0.5) * 30, 1315 - j * 20, -710 + j * 12);
      this.group.add(vineLeaf);
    }
  }

  private createDeskAccessories() {
    // 1. Ceramic Coffee Mug with Rising Procedural Steam & Glazed Ceramic Finish
    const mugMat = new THREE.MeshPhysicalMaterial({
      color: 0xede8dc, // Warm minimalist speckled cream ceramic
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.65,
      clearcoatRoughness: 0.08,
      envMapIntensity: 0.85,
    });

    const mug = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(30, 26, 75, 48), mugMat);
    body.castShadow = true;
    mug.add(body);

    const handle = new THREE.Mesh(new THREE.TorusGeometry(18, 4.5, 16, 32), mugMat);
    handle.position.set(32, 0, 0);
    mug.add(handle);

    // Warm dark espresso liquid inside
    const coffeeLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(27, 27, 4, 32),
      new THREE.MeshStandardMaterial({ color: 0x2b1810, roughness: 0.08, envMapIntensity: 0.9 })
    );
    coffeeLiquid.position.set(0, 32, 0);
    mug.add(coffeeLiquid);

    mug.position.set(-520, 58, 220);
    this.group.add(mug);

    // Procedural Steam
    this.coffeeSteam = new CoffeeSteam(new THREE.Vector3(-520, 155, 220));
    this.group.add(this.coffeeSteam.mesh);

    // 2. Modern White Planter with Lush Succulent & Smooth Glazed Ceramic
    const potMat = new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      roughness: 0.18,
      clearcoat: 0.45,
      envMapIntensity: 0.8,
    });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.38,
    });

    const plantGroup = new THREE.Group();
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(36, 26, 68, 36), potMat);
    pot.castShadow = true;
    plantGroup.add(pot);

    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(12, 48, 12), leafMat);
      leaf.rotation.z = Math.PI / 3;
      leaf.rotation.y = angle;
      leaf.position.set(Math.cos(angle) * 16, 32, Math.sin(angle) * 16);
      plantGroup.add(leaf);
    }
    plantGroup.position.set(-820, 56, 140);
    this.group.add(plantGroup);

    // 3. Minimalist Modern Architectural Desk Lamp with Precision Kinematic Joints
    const lampMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1e26,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.2,
      envMapIntensity: 0.85,
    });
    const brassJointMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.18,
      metalness: 0.95,
      envMapIntensity: 1.25,
    });
    const diffuserMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xffedd5,
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });

    const lampGroup = new THREE.Group();

    // 1. Heavy CNC Chamfered Round Base
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(64, 68, 12, 36), lampMat);
    lampBase.position.set(0, 6, 0);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Brass collar on base
    const baseCollar = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 6, 24), brassJointMat);
    baseCollar.position.set(0, 14, 0);
    lampGroup.add(baseCollar);

    // 2. Base Knuckle & Lower Arm Group
    const lowerArmGroup = new THREE.Group();
    lowerArmGroup.position.set(0, 17, 0);
    // Lean lower arm back and inward slightly
    lowerArmGroup.rotation.z = -0.18;
    lowerArmGroup.rotation.y = 0.35;
    lampGroup.add(lowerArmGroup);

    // Brass knuckle at base
    const baseKnuckle = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 24), brassJointMat);
    lowerArmGroup.add(baseKnuckle);

    // Lower Struts
    const lowerStem = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 340, 24), lampMat);
    lowerStem.position.set(0, 170, 0);
    lowerStem.castShadow = true;
    lowerArmGroup.add(lowerStem);

    // 3. Elbow Knuckle & Upper Arm Group
    const elbowGroup = new THREE.Group();
    elbowGroup.position.set(0, 340, 0);
    // Cantilever forward and downward toward desk surface
    elbowGroup.rotation.z = 0.85;
    lowerArmGroup.add(elbowGroup);

    // Brass elbow knuckle
    const elbowKnuckle = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 24), brassJointMat);
    elbowGroup.add(elbowKnuckle);

    const elbowPin = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 16, 24), brassJointMat);
    elbowPin.rotation.x = Math.PI / 2;
    elbowGroup.add(elbowPin);

    // Upper boom arm
    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 260, 24), lampMat);
    upperArm.position.set(0, 130, 0);
    upperArm.castShadow = true;
    elbowGroup.add(upperArm);

    // 4. Wrist Knuckle & Lamp Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 260, 0);
    // Counter-rotate so shade points directly downward onto the desktop
    headGroup.rotation.z = -0.67;
    elbowGroup.add(headGroup);

    const wristKnuckle = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 20), brassJointMat);
    headGroup.add(wristKnuckle);

    // Sleek Architectural Tapered Lamp Shade
    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(16, 34, 48, 32), lampMat);
    lampShade.position.set(0, -24, 0);
    lampShade.castShadow = true;
    headGroup.add(lampShade);

    // Top cap of shade
    const shadeCap = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 4, 32), lampMat);
    shadeCap.position.set(0, 0, 0);
    headGroup.add(shadeCap);

    // Glowing Warm Recessed LED Diffuser Lens at bottom of shade
    const diffuser = new THREE.Mesh(new THREE.CylinderGeometry(32, 32, 2, 32), diffuserMat);
    diffuser.position.set(0, -47, 0);
    headGroup.add(diffuser);

    // Soft, realistic warm desk illumination (spotlight pointing down)
    const taskLight = new THREE.SpotLight(0xffedd5, 2.2, 850, Math.PI / 3.5, 0.45, 1.2);
    taskLight.position.set(0, -48, 0);
    taskLight.target.position.set(0, -350, 0);
    headGroup.add(taskLight);
    headGroup.add(taskLight.target);

    // Soft local ambient fill
    const ambientBulb = new THREE.PointLight(0xffedd5, 0.8, 350, 1.5);
    ambientBulb.position.set(0, -52, 0);
    headGroup.add(ambientBulb);

    // Position the lamp in the spacious back-left area of the desk
    lampGroup.position.set(-1020, 21, -120);
    this.group.add(lampGroup);
  }

  private createLighting() {
    // 1. Natural Sunlight Streaming from Window (Directional Light with Soft Shadows)
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    sunLight.position.set(-2500, 2000, 800);
    sunLight.target.position.set(0, 300, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 500;
    sunLight.shadow.camera.far = 5000;
    sunLight.shadow.camera.left = -2000;
    sunLight.shadow.camera.right = 2000;
    sunLight.shadow.camera.top = 2000;
    sunLight.shadow.camera.bottom = -2000;
    sunLight.shadow.bias = -0.0005;
    this.group.add(sunLight);
    this.group.add(sunLight.target);

    // 2. Ambient Sky / Room Bounce (HemisphereLight)
    const hemiLight = new THREE.HemisphereLight(0xfff8f0, 0x334155, 1.1);
    hemiLight.position.set(0, 2000, 0);
    this.group.add(hemiLight);

    // 3. Monitor Bias Lighting (Soft cool ambient glow behind the monitor onto the wall)
    const monitorBacklight = new THREE.PointLight(0x38bdf8, 1.5, 1200, 1.5);
    monitorBacklight.position.set(0, 520, -120);
    this.group.add(monitorBacklight);

    // 4. Floating Shelf Warm Downlight
    const shelfWash = new THREE.PointLight(0xfef3c7, 1.2, 800, 1.2);
    shelfWash.position.set(580, 1230, -710);
    this.group.add(shelfWash);
  }

  update(elapsed: number) {
    if (this.coffeeSteam) {
      this.coffeeSteam.update(elapsed);
    }
  }
}
