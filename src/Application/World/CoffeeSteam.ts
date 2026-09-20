import * as THREE from 'three';

const steamVertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    float wave = sin(uv.y * 8.0 - uTime * 2.0) * 8.0 * uv.y;
    newPosition.x += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const steamFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float alpha = (1.0 - vUv.y) * 0.4;
    alpha *= sin(vUv.x * 3.14159);
    float noise = sin(vUv.y * 12.0 - uTime * 3.0) * 0.5 + 0.5;
    alpha *= (noise * 0.5 + 0.5);
    gl_FragColor = vec4(0.85, 0.9, 0.95, alpha);
  }
`;

export default class CoffeeSteam {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;

  constructor(position: THREE.Vector3) {
    this.material = new THREE.ShaderMaterial({
      vertexShader: steamVertexShader,
      fragmentShader: steamFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const geometry = new THREE.PlaneGeometry(60, 180, 16, 32);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.copy(position);
  }

  update(elapsed: number) {
    if (this.material.uniforms) {
      this.material.uniforms.uTime.value = elapsed * 0.0015;
    }
  }
}

