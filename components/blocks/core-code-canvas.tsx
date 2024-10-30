'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Extrude, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ZigZagLine = () => {
  // Define the zigzag points
  const points = [];
  const zigzagWidth = 100; // Horizontal spacing between zigzags
  const zigzagHeight = 50; // Vertical spacing between zigzags
  const numZigzags = 10; // Number of zigzag points

  const totalWidth = numZigzags * zigzagWidth;
  const centerOffsetX = -totalWidth / 2;

  for (let i = 0; i <= numZigzags; i++) {
    const x = centerOffsetX + i * zigzagWidth; // Offset by center position
    const y = i % 2 === 0 ? zigzagHeight : -zigzagHeight; // Alternate up and down
    points.push(new THREE.Vector3(x, y, 0));
  }

  return (
    <Line
      points={points} // Array of Vector3 points
      color="blue" // Color of the line
      lineWidth={5} // Line width
    />
  );
};

const Helpers = () => {
  return (
    <>
      {/* Adds a grid on the xz-plane */}
      <gridHelper args={[5000, 50]} />

      {/* Adds axes for the x, y, and z planes */}
      <axesHelper args={[500]} />
    </>
  );
};

export const CoreCodeCanvas = ({ id }: { id: string }) => {
  return (
    <Canvas
      className="aspect-video"
      camera={{ position: [0, 0, 800], fov: 50, near: 0.1, far: 10000 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[1000, 1000, 1000]} />
      <ZigZagLine />
    </Canvas>
  );
};
