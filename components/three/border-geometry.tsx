import * as THREE from 'three';

export const borderGeometry = (
  geometry: THREE.BufferGeometry,
  color: string = '#000000'
): THREE.LineSegments => {
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: color });
  return new THREE.LineSegments(edges, lineMaterial);
};
