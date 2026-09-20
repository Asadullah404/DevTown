import * as THREE from 'three';

export type CameraKey = 'zoom1_screen' | 'zoom2_table' | 'zoom3_overview' | 'freeCam';

export interface CameraKeyframe {
  position: THREE.Vector3;
  focalPoint: THREE.Vector3;
}

export type Resource =
  | { name: string; type: 'texture'; path: string }
  | { name: string; type: 'audio'; path: string }
  | { name: string; type: 'gltfModel'; path: string };
