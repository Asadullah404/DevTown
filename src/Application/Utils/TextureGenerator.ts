import * as THREE from 'three';

export class TextureGenerator {
  /**
   * Helper: converts a 1-channel height array (0..255) into a tangent-space THREE.CanvasTexture normal map
   */
  private static heightMapToNormalTexture(
    heights: Float32Array,
    width: number,
    height: number,
    strength: number = 2.0
  ): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const yPrev = (y - 1 + height) % height;
      const yNext = (y + 1) % height;
      const rowCurr = y * width;
      const rowPrev = yPrev * width;
      const rowNext = yNext * width;

      for (let x = 0; x < width; x++) {
        const xPrev = (x - 1 + width) % width;
        const xNext = (x + 1) % width;

        const left = heights[rowCurr + xPrev];
        const right = heights[rowCurr + xNext];
        const up = heights[rowPrev + x];
        const down = heights[rowNext + x];

        const dx = (right - left) * strength;
        const dy = (down - up) * strength;
        const dz = 1.0;

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = -dx / len;
        const ny = -dy / len;
        const nz = dz / len;

        const idx = (rowCurr + x) * 4;
        data[idx] = Math.round((nx * 0.5 + 0.5) * 255);
        data[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
        data[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Generates ultra-high-definition warm natural European oak wood texture (2048x2048)
   */
  static createWoodTexture(width = 2048, height = 2048): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Rich natural oak base color gradient
    const baseGrad = ctx.createLinearGradient(0, 0, width, height);
    baseGrad.addColorStop(0, '#c7a780');
    baseGrad.addColorStop(0.35, '#cba983');
    baseGrad.addColorStop(0.7, '#c29f79');
    baseGrad.addColorStop(1, '#cbab86');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Multi-frequency authentic organic growth rings
    for (let y = 0; y < height; y++) {
      // Harmonic wave formula for natural tree rings
      const w1 = Math.sin(y * 0.045) * 12;
      const w2 = Math.cos(y * 0.018 + 0.4) * 8;
      const w3 = Math.sin(y * 0.09 + 1.2) * 4;
      const ringPattern = Math.sin((y + w1 + w2 + w3) * 0.12);

      if (ringPattern > 0.25) {
        const ringIntensity = (ringPattern - 0.25) * 0.22;
        ctx.fillStyle = `rgba(132, 95, 58, ${ringIntensity.toFixed(3)})`;
        ctx.fillRect(0, y, width, 1.4);
      } else if (ringPattern < -0.4) {
        // Latewood darker dense boundary
        ctx.fillStyle = 'rgba(110, 78, 48, 0.12)';
        ctx.fillRect(0, y, width, 1.2);
      }
    }

    // Fine wood pores (continuous subtle vertical capillary streaks)
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const len = 15 + Math.random() * 120;
      const alpha = 0.04 + Math.random() * 0.08;
      ctx.fillStyle = `rgba(95, 68, 42, ${alpha.toFixed(3)})`;
      ctx.fillRect(x, y, 1.2, len);
    }

    // Medullary rays (fine horizontal flecks characteristic of premium quarter-sawn white oak)
    for (let j = 0; j < 3500; j++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const w = 8 + Math.random() * 32;
      const isLight = Math.random() > 0.4;
      ctx.fillStyle = isLight
        ? 'rgba(235, 218, 195, 0.16)'
        : 'rgba(105, 75, 45, 0.08)';
      ctx.fillRect(x, y, w, 1.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Generates realistic Normal Map for European oak wood tabletop
   */
  static createWoodNormalMap(width = 2048, height = 2048): THREE.CanvasTexture {
    const heights = new Float32Array(width * height);

    for (let y = 0; y < height; y++) {
      const w1 = Math.sin(y * 0.045) * 12;
      const w2 = Math.cos(y * 0.018 + 0.4) * 8;
      const ringPattern = Math.sin((y + w1 + w2) * 0.12);
      const ringVal = ringPattern * 0.4;

      for (let x = 0; x < width; x++) {
        heights[y * width + x] = ringVal;
      }
    }

    // Add pore grooves into height array
    for (let i = 0; i < 12000; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const len = Math.floor(10 + Math.random() * 60);
      for (let l = 0; l < len; l++) {
        const py = (y + l) % height;
        heights[py * width + x] -= 0.35;
      }
    }

    return this.heightMapToNormalTexture(heights, width, height, 2.5);
  }

  /**
   * Generates Wood Roughness Map (satin finish with porous micro-variation)
   */
  static createWoodRoughnessMap(width = 2048, height = 2048): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Base satin finish roughness (~0.30)
    ctx.fillStyle = '#4c4c4c';
    ctx.fillRect(0, 0, width, height);

    // Rougher pores
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const len = 10 + Math.random() * 80;
      ctx.fillStyle = 'rgba(180, 180, 180, 0.25)';
      ctx.fillRect(x, y, 1.5, len);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Generates architectural modern wide-plank Scandinavian oak floor texture (2048x2048)
   */
  static createFloorTexture(width = 2048, height = 2048): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#bba07e';
    ctx.fillRect(0, 0, width, height);

    const plankHeight = 160;
    const plankWidths = [600, 750, 500, 850, 700];

    let rowIdx = 0;
    for (let y = 0; y < height; y += plankHeight) {
      let x = -(rowIdx * 280) % 600;
      rowIdx++;

      while (x < width + 400) {
        const pWidth = plankWidths[Math.floor(Math.random() * plankWidths.length)];
        // Individual plank shade variation (natural Scandinavian oak boards)
        const toneShift = (Math.random() - 0.5) * 28;
        const r = Math.min(240, Math.max(160, 195 + toneShift));
        const g = Math.min(215, Math.max(135, 168 + toneShift * 0.9));
        const b = Math.min(185, Math.max(105, 134 + toneShift * 0.8));
        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        ctx.fillRect(x, y, pWidth, plankHeight);

        // Subtle plank grain lines
        for (let py = y + 2; py < y + plankHeight - 2; py += 3) {
          const grainAlpha = 0.04 + Math.random() * 0.08;
          ctx.fillStyle = `rgba(115, 82, 52, ${grainAlpha.toFixed(3)})`;
          ctx.fillRect(x, py, pWidth, 1.5);
        }

        // Vertical plank end seam
        ctx.fillStyle = 'rgba(45, 30, 18, 0.65)';
        ctx.fillRect(x + pWidth - 3, y, 3, plankHeight);
        ctx.fillStyle = 'rgba(255, 245, 230, 0.18)';
        ctx.fillRect(x + pWidth, y, 1.5, plankHeight);

        x += pWidth;
      }

      // Horizontal micro-bevel V-groove between rows
      ctx.fillStyle = 'rgba(40, 26, 15, 0.75)';
      ctx.fillRect(0, y + plankHeight - 3, width, 3);
      ctx.fillStyle = 'rgba(255, 245, 230, 0.22)';
      ctx.fillRect(0, y + plankHeight, width, 1.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }

  /**
   * Generates Floor Normal Map with plank bevel grooves and pore relief
   */
  static createFloorNormalMap(width = 2048, height = 2048): THREE.CanvasTexture {
    const heights = new Float32Array(width * height);
    const plankHeight = 160;

    for (let y = 0; y < height; y++) {
      const inBevel = y % plankHeight >= plankHeight - 4;
      const bevelDepth = inBevel ? -1.0 : 0.0;
      for (let x = 0; x < width; x++) {
        heights[y * width + x] = bevelDepth;
      }
    }

    // Vertical plank seams
    const plankWidth = 650;
    for (let y = 0; y < height; y++) {
      const rowOffset = Math.floor(y / plankHeight) * 280;
      for (let x = 0; x < width; x++) {
        if ((x + rowOffset) % plankWidth < 3) {
          heights[y * width + x] -= 0.8;
        }
      }
    }

    const texture = this.heightMapToNormalTexture(heights, width, height, 3.0);
    texture.repeat.set(4, 4);
    return texture;
  }

  /**
   * Generates premium pebbled Italian full-grain leather desk mat texture (1024x1024)
   */
  static createDeskMatTexture(width = 1024, height = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Rich deep slate/charcoal leather base
    ctx.fillStyle = '#1b1f29';
    ctx.fillRect(0, 0, width, height);

    // Micro-pebble cellular grain
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Embossed edge crease groove (18px from edges)
    const margin = 20;
    ctx.strokeStyle = 'rgba(10, 12, 16, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    // Precision perimeter saddle stitching (fine linen thread stitches)
    const stitchMargin = 20;
    const stitchLength = 8;
    const stitchGap = 5;

    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 1.8;

    // Draw stitches around rectangle with individual tilted stitches
    const drawStitchLine = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const steps = Math.floor(dist / (stitchLength + stitchGap));
      const ux = dx / dist;
      const uy = dy / dist;

      for (let s = 0; s < steps; s++) {
        const tStart = s * (stitchLength + stitchGap);
        const tEnd = tStart + stitchLength;
        const sx = x1 + ux * tStart;
        const sy = y1 + uy * tStart;
        const ex = x1 + ux * tEnd;
        const ey = y1 + uy * tEnd;

        // Needle puncture shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Stitch thread
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    };

    drawStitchLine(stitchMargin, stitchMargin, width - stitchMargin, stitchMargin);
    drawStitchLine(width - stitchMargin, stitchMargin, width - stitchMargin, height - stitchMargin);
    drawStitchLine(width - stitchMargin, height - stitchMargin, stitchMargin, height - stitchMargin);
    drawStitchLine(stitchMargin, height - stitchMargin, stitchMargin, stitchMargin);
    ctx.restore();

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Generates Leather Desk Mat Normal Map (tactile pebbled grain and stitch indentation)
   */
  static createDeskMatNormalMap(width = 1024, height = 1024): THREE.CanvasTexture {
    const heights = new Float32Array(width * height);

    // Pebble noise
    for (let i = 0; i < heights.length; i++) {
      heights[i] = (Math.random() - 0.5) * 0.25;
    }

    // Stitch indent depression
    const margin = 20;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nearEdgeX = Math.abs(x - margin) < 3 || Math.abs(x - (width - margin)) < 3;
        const nearEdgeY = Math.abs(y - margin) < 3 || Math.abs(y - (height - margin)) < 3;
        if (
          (nearEdgeX && y >= margin && y <= height - margin) ||
          (nearEdgeY && x >= margin && x <= width - margin)
        ) {
          heights[y * width + x] -= 0.6;
        }
      }
    }

    return this.heightMapToNormalTexture(heights, width, height, 1.8);
  }

  /**
   * Generates warm off-white minimalist architectural plaster wall texture (1024x1024)
   */
  static createWallTexture(width = 1024, height = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Warm minimalist off-white / greige
    ctx.fillStyle = '#ebe7e0';
    ctx.fillRect(0, 0, width, height);

    // Subtle trowel relief strokes
    for (let i = 0; i < 400; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const rad = 40 + Math.random() * 90;
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, rad);
      const isLighter = Math.random() > 0.5;
      grad.addColorStop(0, isLighter ? 'rgba(255, 255, 255, 0.05)' : 'rgba(215, 208, 198, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mineral aggregate micro-stipple
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 10;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 4);
    return texture;
  }

  /**
   * Generates Wall Plaster Normal Map
   */
  static createWallNormalMap(width = 1024, height = 1024): THREE.CanvasTexture {
    const heights = new Float32Array(width * height);
    for (let i = 0; i < heights.length; i++) {
      heights[i] = (Math.random() - 0.5) * 0.15;
    }
    const texture = this.heightMapToNormalTexture(heights, width, height, 1.2);
    texture.repeat.set(6, 4);
    return texture;
  }

  /**
   * Generates Anisotropic Brushed Aluminum texture (1024x1024)
   */
  static createBrushedMetalTexture(width = 1024, height = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Anodized space silver tone
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(0, 0, width, height);

    // Dense horizontal micro-hairline scratches
    for (let y = 0; y < height; y++) {
      const noise = (Math.random() - 0.5) * 35;
      const alpha = 0.08 + Math.random() * 0.12;
      ctx.fillStyle = noise > 0
        ? `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        : `rgba(0, 0, 0, ${alpha.toFixed(3)})`;
      ctx.fillRect(0, y, width, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Generates Brushed Metal Normal Map for anisotropic specular highlights
   */
  static createBrushedMetalNormalMap(width = 1024, height = 1024): THREE.CanvasTexture {
    const heights = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
      const lineVal = (Math.random() - 0.5) * 0.4;
      const row = y * width;
      for (let x = 0; x < width; x++) {
        heights[row + x] = lineVal;
      }
    }
    return this.heightMapToNormalTexture(heights, width, height, 1.5);
  }

  /**
   * Generates Herman Miller Aeron Pellicle elastomeric mesh texture (512x512)
   */
  static createAeronMeshTexture(width = 512, height = 512): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#1c202a';
    ctx.fillRect(0, 0, width, height);

    // Pellicle weave grid
    const step = 8;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        // Weave warp & weft
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(x + 1, y, step - 2, 3);
        ctx.fillStyle = '#3a4454';
        ctx.fillRect(x, y + 1, 3, step - 2);

        // Suspension aperture breathing hole
        ctx.fillStyle = '#141720';
        ctx.fillRect(x + 3, y + 3, step - 5, step - 5);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    return texture;
  }

  /**
   * Generates Studio Speaker Kevlar woven twill cone texture (512x512)
   */
  static createSpeakerConeTexture(width = 512, height = 512): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Golden amber Kevlar base
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, 0, width, height);

    // 2x2 Twill weave pattern
    const step = 6;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const isHighlight = ((x + y) / step) % 2 === 0;
        ctx.fillStyle = isHighlight ? '#f59e0b' : '#78350f';
        ctx.fillRect(x, y, step - 1, step - 1);
      }
    }

    // Concentric acoustic damping rings
    const cx = width / 2;
    const cy = height / 2;
    ctx.lineWidth = 1.5;
    for (let r = 20; r < width / 2; r += 24) {
      ctx.strokeStyle = 'rgba(50, 20, 5, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Generates a modern minimalist architectural art print fallback
   */
  static createArtTexture(width = 512, height = 700): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Cream background
    ctx.fillStyle = '#f7f4ed';
    ctx.fillRect(0, 0, width, height);

    // Large earthy terracotta circle
    ctx.fillStyle = '#c86b4d';
    ctx.beginPath();
    ctx.arc(width * 0.45, height * 0.4, 160, 0, Math.PI * 2);
    ctx.fill();

    // Dark slate crescent / arch
    ctx.fillStyle = '#26303d';
    ctx.beginPath();
    ctx.arc(width * 0.55, height * 0.55, 140, Math.PI * 0.2, Math.PI * 1.2);
    ctx.lineTo(width * 0.55, height * 0.7);
    ctx.fill();

    // Muted sage geometric bar
    ctx.fillStyle = '#8a9a86';
    ctx.fillRect(width * 0.2, height * 0.7, 280, 24);

    // Minimalist caption text
    ctx.fillStyle = '#7a7670';
    ctx.font = '14px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('AI ARCHITECTURE // 2026', width * 0.25, height * 0.88);

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Generates window daylight sky view with soft clouds and city silhouettes
   */
  static createWindowViewTexture(width = 1024, height = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Soft sky gradient (morning daylight)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#7dd3fc');
    skyGrad.addColorStop(0.5, '#bae6fd');
    skyGrad.addColorStop(0.8, '#fef08a');
    skyGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Distant city silhouette
    ctx.fillStyle = 'rgba(125, 160, 195, 0.4)';
    for (let x = 0; x < width; x += 30 + Math.random() * 40) {
      const bHeight = 120 + Math.random() * 200;
      const bWidth = 25 + Math.random() * 35;
      ctx.fillRect(x, height - bHeight, bWidth, bHeight);
    }

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Generates realistic architectural studio window specular reflection across glass screen
   */
  static createGlassReflectionTexture(width = 1440, height = 810): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, width, height);

    // Studio Window Specular Glare
    const windowGlare = ctx.createLinearGradient(0, 0, width * 0.9, height);
    windowGlare.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
    windowGlare.addColorStop(0.18, 'rgba(240, 248, 255, 0.25)');
    windowGlare.addColorStop(0.38, 'rgba(215, 235, 255, 0.10)');
    windowGlare.addColorStop(0.65, 'rgba(190, 215, 245, 0.02)');
    windowGlare.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = windowGlare;
    ctx.fillRect(0, 0, width, height);

    // Soft horizontal ambient ceiling light reflection
    const ceilingSheen = ctx.createLinearGradient(0, 0, 0, height * 0.35);
    ceilingSheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    ceilingSheen.addColorStop(0.4, 'rgba(245, 250, 255, 0.07)');
    ceilingSheen.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = ceilingSheen;
    ctx.fillRect(0, 0, width, height * 0.35);

    // Subtle curved specular highlight across the upper glass
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height * 0.15);
    ctx.bezierCurveTo(width * 0.4, height * 0.25, width * 0.7, height * 0.05, width, height * 0.1);
    ctx.lineTo(width, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    const curveGrad = ctx.createLinearGradient(0, 0, 0, height * 0.25);
    curveGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
    curveGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = curveGrad;
    ctx.fill();
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  /**
   * Generates inner shadow vignette for realistic screen depth where LCD meets bezel
   */
  static createMonitorInnerShadowTexture(width = 1440, height = 810): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, width, height);

    const shadowSize = 16;

    // Top inner shadow
    const topGrad = ctx.createLinearGradient(0, 0, 0, shadowSize);
    topGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, shadowSize);

    // Bottom inner shadow
    const btmGrad = ctx.createLinearGradient(0, height - shadowSize, 0, height);
    btmGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    btmGrad.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
    ctx.fillStyle = btmGrad;
    ctx.fillRect(0, height - shadowSize, width, shadowSize);

    // Left inner shadow
    const leftGrad = ctx.createLinearGradient(0, 0, shadowSize, 0);
    leftGrad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    leftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(0, 0, shadowSize, height);

    // Right inner shadow
    const rightGrad = ctx.createLinearGradient(width - shadowSize, 0, width, 0);
    rightGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    rightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(width - shadowSize, 0, shadowSize, height);

    // Ultra-crisp 1px bevel highlight on the top and left glass edge
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, height - 1);
    ctx.lineTo(1, 1);
    ctx.lineTo(width - 1, 1);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }
}
