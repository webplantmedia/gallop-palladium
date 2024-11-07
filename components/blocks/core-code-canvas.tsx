'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, SpotLight, useHelper } from '@react-three/drei';
import * as THREE from 'three';

const RPanelProfile = React.forwardRef<THREE.Mesh, {}>((_, ref) => {
  const largePeakHeight = 1.25;
  const largePeakHalfLength = 0.5;
  const largeSlopeLength = 1.15625;

  const smallPeakHeight = 0.25;
  const smallPeakLength = 0.75;
  const smallSlopeLength = 0.34375;

  const valleyLength = 1.625;
  const valleyMiddleLength = 2.5625;

  const startLength = largeSlopeLength * 0.4;
  const startHeight =
    largePeakHeight - (largePeakHeight * startLength) / largeSlopeLength;

  let points: { x: number; y: number }[] = [];

  const beginning = [
    { x: 0, y: startHeight },
    { x: startLength, y: largePeakHeight },
    { x: largePeakHalfLength, y: largePeakHeight },
  ];

  const middle = [
    { x: largePeakHalfLength, y: largePeakHeight },
    { x: largeSlopeLength, y: 0 },
    { x: valleyLength, y: 0 },
    { x: smallSlopeLength, y: smallPeakHeight },
    { x: smallPeakLength, y: smallPeakHeight },
    { x: smallSlopeLength, y: 0 },
    { x: valleyMiddleLength, y: 0 },
    { x: smallSlopeLength, y: smallPeakHeight },
    { x: smallPeakLength, y: smallPeakHeight },
    { x: smallSlopeLength, y: 0 },
    { x: valleyLength, y: 0 },
    { x: largeSlopeLength, y: largePeakHeight },
    { x: largePeakHalfLength, y: largePeakHeight },
  ];

  const end = [
    { x: largePeakHalfLength, y: largePeakHeight },
    { x: startLength, y: startHeight },
  ];

  function buildCoords(
    coords: Array<{ x: number; y: number }>
  ): { x: number; y: number }[] {
    let cumulativeX = 0;
    return coords.map((coord) => {
      const point = { x: cumulativeX + coord.x, y: coord.y };
      cumulativeX += coord.x;
      return point;
    });
  }

  points = points.concat(beginning);
  for (let i = 0; i < 3; i++) {
    points = points.concat(middle);
  }
  points = points.concat(end);

  const coords = buildCoords(points);

  const totalWidth = coords[coords.length - 1].x - coords[0].x;
  const centerOffsetX = -(totalWidth / 2);

  const profilePoints = coords.map(
    (coord) => new THREE.Vector3(coord.x + centerOffsetX, coord.y + 1, 0)
  );

  const vertices: number[] = [];
  const indices: number[] = [];

  profilePoints.forEach((point, i) => {
    vertices.push(point.x, point.y, 0); // Top surface
    vertices.push(point.x, point.y, -1); // Bottom surface
    if (i < profilePoints.length - 1) {
      const j = i * 2;
      indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2); // Two triangles per quad
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 'green',
    metalness: 0.5,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  return <mesh ref={ref} geometry={geometry} material={material} castShadow />;
});

RPanelProfile.displayName = 'RPanelProfile';

export const CoreCodeCanvas = ({ id }: { id: string }) => {
  const rPanelRef = useRef<THREE.Mesh>(null);

  return (
    <Canvas
      className="aspect-video"
      camera={{ position: [0, 20, 30], fov: 40, near: 0.1, far: 100 }}
      style={{ background: 'white', padding: 0 }}
      shadows
    >
      <directionalLight
        color="white"
        castShadow
        intensity={10}
        position={[10, 40, 0]}
        shadow-mapSize={[1024, 1024]}
      />

      <RPanelProfile ref={rPanelRef} />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};
