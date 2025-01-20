import * as THREE from 'three';

export const thickLineGeometry = (
  smoothedPoints: any,
  thickness: any,
  width: any
) => {
  const vertices = [];
  const indices = [];

  const perpVec = (p1: any, p2: any) => {
    const direction = new THREE.Vector2(p2.x - p1.x, p2.y - p1.y).normalize();
    return new THREE.Vector2(-direction.y, direction.x).multiplyScalar(
      thickness / 2
    );
  };

  for (let i = 0; i < smoothedPoints.length - 1; i++) {
    const p1 = smoothedPoints[i];
    const p2 = smoothedPoints[i + 1];

    const perp = perpVec(p1, p2);

    // Top face vertices
    vertices.push(p1.x + perp.x, p1.y + perp.y, width / 2);
    vertices.push(p1.x - perp.x, p1.y - perp.y, width / 2);
    vertices.push(p2.x + perp.x, p2.y + perp.y, width / 2);
    vertices.push(p2.x - perp.x, p2.y - perp.y, width / 2);

    // Bottom face vertices
    vertices.push(p1.x + perp.x, p1.y + perp.y, -width / 2);
    vertices.push(p1.x - perp.x, p1.y - perp.y, -width / 2);
    vertices.push(p2.x + perp.x, p2.y + perp.y, -width / 2);
    vertices.push(p2.x - perp.x, p2.y - perp.y, -width / 2);

    const baseIndex = i * 8;

    // Top face
    indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
    indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);

    // Bottom face
    indices.push(baseIndex + 4, baseIndex + 5, baseIndex + 6);
    indices.push(baseIndex + 5, baseIndex + 7, baseIndex + 6);

    // Sides
    indices.push(baseIndex, baseIndex + 4, baseIndex + 5);
    indices.push(baseIndex, baseIndex + 5, baseIndex + 1);

    indices.push(baseIndex + 2, baseIndex + 6, baseIndex + 7);
    indices.push(baseIndex + 2, baseIndex + 7, baseIndex + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};
