import * as THREE from 'three';

export const shapeGeometry = (points: any, width: any) => {
  const vertices: number[] = [];
  const indices: number[] = [];

  points.forEach((point: any, i: any) => {
    vertices.push(point.x, point.y, width / 2);
    vertices.push(point.x, point.y, -width / 2);
    if (i < points.length - 1) {
      const j = i * 2;
      indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};
