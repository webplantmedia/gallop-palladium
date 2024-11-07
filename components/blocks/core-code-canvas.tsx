'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import * as THREE from 'three';

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
  const centerOffsetX = -(totalWidth / 2);

  const profilePoints = coords.map(
    (coord) => new THREE.Vector3(coord.x + centerOffsetX, coord.y + 1, 0)
  );

  const vertices: number[] = [];
  const indices: number[] = [];
  const normals: number[] = [];

  profilePoints.forEach((point, i) => {
    vertices.push(point.x, point.y, 0); // Top
    vertices.push(point.x, point.y, -1); // Bottom
    if (i < profilePoints.length - 1) {
      const j = i * 2;
      indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2);
    }
  });

  // Function to calculate normals
  function calculateNormals(vertices: number[], indices: number[]): number[] {
    const normals = new Array(vertices.length).fill(0);

    for (let i = 0; i < indices.length; i += 3) {
      const i0 = indices[i] * 3;
      const i1 = indices[i + 1] * 3;
      const i2 = indices[i + 2] * 3;

      const v0 = new THREE.Vector3(
        vertices[i0],
        vertices[i0 + 1],
        vertices[i0 + 2]
      );
      const v1 = new THREE.Vector3(
        vertices[i1],
        vertices[i1 + 1],
        vertices[i1 + 2]
      );
      const v2 = new THREE.Vector3(
        vertices[i2],
        vertices[i2 + 1],
        vertices[i2 + 2]
      );

      const edge1 = new THREE.Vector3().subVectors(v1, v0);
      const edge2 = new THREE.Vector3().subVectors(v2, v0);

      const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

      normals[i0] += normal.x;
      normals[i0 + 1] += normal.y;
      normals[i0 + 2] += normal.z;

      normals[i1] += normal.x;
      normals[i1 + 1] += normal.y;
      normals[i1 + 2] += normal.z;

      normals[i2] += normal.x;
      normals[i2 + 1] += normal.y;
      normals[i2 + 2] += normal.z;
    }

    for (let i = 0; i < normals.length; i += 3) {
      const normal = new THREE.Vector3(
        normals[i],
        normals[i + 1],
        normals[i + 2]
      ).normalize();
      normals[i] = normal.x;
      normals[i + 1] = normal.y;
      normals[i + 2] = normal.z;
    }

    return normals;
  }

  const computedNormals = calculateNormals(vertices, indices);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(vertices)}
          count={vertices.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(indices)}
          itemSize={1}
          count={indices.length}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={new Float32Array(computedNormals)}
          itemSize={3}
          count={computedNormals.length / 3}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="green"
        metalness={0.3}
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

RPanelProfile.displayName = 'RPanelProfile';

const Helpers = () => {
  return (
    <>
      {/* Adds a grid on the xz-plane */}
      <gridHelper args={[40, 40]} />

      {/* Adds axes for the x, y, and z planes */}
      <axesHelper args={[20]} />
    </>
  );
};

export const CoreCodeCanvas = ({ id }: { id: string }) => {
  return (
    <Canvas
      className="aspect-video"
      camera={{ position: [0, 20, 30], fov: 40, near: 0.1, far: 100 }}
      style={{ background: 'white', padding: 0 }}
    >
      <RPanelProfile />
      <ambientLight intensity={0.5} color="white" />
      <directionalLight position={[10, 30, 0]} intensity={4} color="white" />
      <directionalLight position={[-10, -30, 0]} intensity={4} color="white" />
      <OrbitControls position={[0, 0, 0]} enableZoom={false} />
    </Canvas>
  );
};
