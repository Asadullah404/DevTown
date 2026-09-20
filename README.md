# Asad Portfolio — Modern 3D AI Workstation

An interactive 3D modern workstation portfolio for **Muhammad Asadullah Sohail** (AI Engineer & Full-Stack Developer), featuring a modern 16:9 ultra-slim bezel monitor running a fully functional **Windows 11** desktop simulation inside Three.js via `CSS3DRenderer`.

---

## Features

- **Modern 3D Workstation**:
  - Contemporary minimalist standing desk with dark acoustic slat wood accent wall.
  - Modern tempered glass PC mid-tower with internal RGB fan rings and GPU lighting.
  - Modern studio audio monitor speakers with yellow Kevlar cones.
  - Mechanical keyboard with RGB underglow and ergonomic mouse.
  - Modern matte ceramic mug with procedural rising steam shader.
  - Modern ceramic planter with succulent.
- **Interactive Windows 11 Desktop (16:9 Widescreen)**:
  - Runs in real-time on the monitor screen via Three.js `CSS3DRenderer`.
  - Windows 11 Start Menu, Taskbar, System Tray, and Notification Toasts.
  - **Resume / CV App**: Embedded PDF reader + accessible HTML view with direct download for `Muhammad_Asadullah_Sohail_CV.pdf`.
  - **Flagship Projects App**: Follow Cart FYP (10,000 PKR Award winner), Auto Blog AI, AI Video Dubbing & Neural Codec, Bulk Watermark Hider, TaskHubDigital, Pharmacy Inventory Manager, ESP32-CAM Spy Car.
  - Apps for Terminal, Browser, Skills, Experience, Settings, and Contact.
- **Cinematic Camera System**:
  - **Idle**: Gentle orbital drift showing the full workstation and room.
  - **Desk**: Over-the-shoulder view with responsive mouse parallax tracking.
  - **Monitor**: Smooth zoom directly into the Windows 11 screen with aspect-ratio zoom compensation.
  - **FreeCam**: OrbitControls mode allowing full 360° inspection of the 3D room.
- **Modern Spatial Audio**:
  - Tactile mechanical keyboard switch clicks.
  - Optical mouse clicks.
  - Windows 11 startup sound.
  - Workstation room hum with dynamic distance-based low-pass filtering.
- **UEFI Modern Boot Sequence**:
  - Diagnostic telemetry splash screen with progress bar and launch button.

---

## Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Opens the project at `http://localhost:3000`.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## Architecture

- `src/Application/Application.ts`: Core singleton orchestrating scenes, camera, renderer, audio, and loop.
- `src/Application/World/ModernMonitor.ts`: 16:9 slim-bezel monitor housing the Windows 11 `CSS3DObject` iframe with GL occlusion plane.
- `src/Application/World/ModernWorkstation.ts`: 3D procedural PBR meshes (desk, PC tower, peripherals, speakers, mug, lighting).
- `src/Application/Audio/AudioManager.ts`: Web Audio API positional sound effects and distance filtering.
- `src/Application/Camera/Camera.ts`: Camera transition engine with keyframes.
- `src/Application/UI/components/ModernBootScreen.tsx`: Modern UEFI diagnostic startup screen.
- `public/os/`: Standalone build of the Windows 11 desktop application with `Muhammad_Asadullah_Sohail_CV.pdf`.

