import * as THREE from 'three';

export class GeometryUtils {
  /**
   * Creates a studio-grade box geometry with silky smooth filleted edges and rounded corners
   * Used for premium furniture, tabletop, electronics enclosures, and accessories
   */
  static createRoundedBox(
    width: number,
    height: number,
    depth: number,
    radius: number,
    smoothness: number = 4
  ): THREE.BufferGeometry {
    const maxRadius = Math.min(width, height, depth) * 0.48;
    const r = Math.max(0.1, Math.min(radius, maxRadius));

    const shape = new THREE.Shape();
    const w = width / 2;
    const h = height / 2;

    shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, true);
    shape.absarc(w - r, -h + r, r, Math.PI * 1.5, Math.PI * 2, true);
    shape.absarc(w - r, h - r, r, 0, Math.PI * 0.5, true);
    shape.absarc(-w + r, h - r, r, Math.PI * 0.5, Math.PI, true);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.1, depth - r * 2),
      bevelEnabled: true,
      bevelSegments: smoothness,
      steps: 1,
      bevelSize: r,
      bevelThickness: r,
      curveSegments: Math.max(smoothness * 2, 6),
    });

    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  /**
   * Creates a rounded 2D tablet/plate geometry with smooth corner radii
   */
  static createRoundedPlate(
    width: number,
    height: number,
    thickness: number,
    cornerRad: number
  ): THREE.BufferGeometry {
    const r = Math.min(cornerRad, Math.min(width, height) * 0.45);
    const shape = new THREE.Shape();
    const w = width / 2;
    const h = height / 2;

    shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, true);
    shape.absarc(w - r, -h + r, r, Math.PI * 1.5, Math.PI * 2, true);
    shape.absarc(w - r, h - r, r, 0, Math.PI * 0.5, true);
    shape.absarc(-w + r, h - r, r, Math.PI * 0.5, Math.PI, true);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 1.5,
      bevelThickness: 1.5,
      curveSegments: 8,
    });

    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }
}

