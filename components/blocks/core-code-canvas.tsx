'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';

import * as THREE from 'three';

interface DimensionProps {
  start: [number, number, number]; // Start point of the dimension line
  end: [number, number, number]; // End point of the dimension line
  text: string; // Text label for the dimension
}

const Dimension = ({ start, end, text }: DimensionProps) => {
  const midPoint = new THREE.Vector3()
    .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
    .multiplyScalar(0.5); // Calculate midpoint for placing the label

  const offset = 0.3; // Offset for perpendicular lines

  return (
    <group>
      {/* Perpendicular Line at Start */}
      <Line
        points={[
          [start[0], start[1] + offset, start[2]],
          [start[0], start[1] - offset, start[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Main Dimension Line */}
      <Line
        points={[
          [start[0], start[1], start[2]],
          [end[0], end[1], end[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Perpendicular Line at End */}
      <Line
        points={[
          [end[0], end[1] + offset, end[2]],
          [end[0], end[1] - offset, end[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Text Label at Midpoint */}
      <Html position={[midPoint.x, midPoint.y, midPoint.z]} center>
        <div className="text-base-contrast bg-base-card p-1 rounded-sm text-xs select-none">
          {text}
        </div>
      </Html>
    </group>
  );
};

const RPanelProfile = () => {
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

  const profilePoints = coords.map(
    (coord) => new THREE.Vector3(coord.x, coord.y + 1, 0)
  );

  const vertices: number[] = [];
  const indices: number[] = [];

  profilePoints.forEach((point, i) => {
    vertices.push(point.x, point.y, 0); // Top
    vertices.push(point.x, point.y, -1); // Bottom
    if (i < profilePoints.length - 1) {
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
  geometry.translate(-19, -2, 0.5);

  const material = new THREE.MeshStandardMaterial({
    color: 'green',
    metalness: 0.1,
    roughness: 20,
    flatShading: true,
    side: THREE.BackSide,
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: 'white',
    metalness: 0.1,
    roughness: 20,
    flatShading: true,
    side: THREE.FrontSide,
  });

  return (
    <group>
      <Dimension start={[-6, 2, 0]} end={[6, 2, 0]} text='12"' />
      <Dimension start={[-18, 4, 0]} end={[18, 4, 0]} text='36"' />
      <mesh geometry={geometry} material={material} />
      <mesh geometry={geometry} material={material2} />
    </group>
  );
};

export const CoreCodeCanvas = ({ id }: { id: string }) => {
  return (
    <Canvas
      className="aspect-video bg-base-card rounded-sm"
      camera={{ position: [0, 20, 30], fov: 40, near: 0.1, far: 100 }}
      style={{ padding: 0 }}
    >
      <RPanelProfile />
      <OrbitControls
        enableZoom={false}
        enableDamping={true}
        dampingFactor={0.3}
      />
      <Environment
        preset="studio"
        environmentIntensity={0.3}
        background={false}
      />
    </Canvas>
  );
};
