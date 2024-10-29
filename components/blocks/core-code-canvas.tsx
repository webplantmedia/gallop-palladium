'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Extrude, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MetalProfile = () => {
  const shape = new THREE.Shape();

  // Manually define the path based on the SVG data provided
  shape.moveTo(4.95, 42);
  shape.lineTo(31.2, 15.75);
  shape.lineTo(118.7, 15.75);
  shape.lineTo(171.2, 85.75);
  shape.lineTo(267.44, 85.75);
  shape.lineTo(284.94, 68.25);
  shape.lineTo(372.44, 68.25);
  shape.lineTo(389.94, 85.75);
  shape.lineTo(521.19, 85.75);
  shape.lineTo(538.69, 68.25);
  shape.lineTo(634.94, 68.25);
  shape.lineTo(652.43, 85.75);
  shape.lineTo(774.93, 85.75);
  shape.lineTo(827.43, 15.75);
  shape.lineTo(914.93, 15.75);
  shape.lineTo(967.43, 85.75);
  shape.lineTo(1063.68, 85.75);
  shape.lineTo(1089.92, 59.5);
  shape.lineTo(1168.67, 59.5);
  shape.lineTo(1194.92, 85.75);
  shape.lineTo(1317.42, 85.75);
  shape.lineTo(1343.67, 59.5);
  shape.lineTo(1431.17, 59.5);
  shape.lineTo(1457.42, 85.75);
  shape.lineTo(1571.16, 85.75);
  shape.lineTo(1623.66, 7);
  shape.lineTo(1702.41, 7);
  shape.lineTo(1754.91, 77);
  shape.lineTo(1859.91, 77);
  shape.lineTo(1877.41, 59.5);
  shape.lineTo(1964.9, 59.5);
  shape.lineTo(1982.4, 77);
  shape.lineTo(2113.65, 77);
  shape.lineTo(2131.15, 59.5);
  shape.lineTo(2227.4, 59.5);
  shape.lineTo(2244.9, 77);
  shape.lineTo(2367.4, 77);
  shape.lineTo(2411.14, 7);
  shape.lineTo(2498.64, 7);
  shape.lineTo(2542.39, 77);
  shape.lineTo(2603.64, 77);

  const extrudeSettings = {
    steps: 2,
    depth: 10, // Adjust depth as necessary for visibility
    bevelEnabled: false,
  };

  return (
    <mesh>
      <Extrude args={[shape, extrudeSettings]}>
        <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
      </Extrude>
    </mesh>
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
      className="aspect-4/3"
      camera={{ position: [0, 0, 800], fov: 50, near: 0.1, far: 10000 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[1000, 1000, 1000]} />
      <MetalProfile />
      <Helpers />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};
