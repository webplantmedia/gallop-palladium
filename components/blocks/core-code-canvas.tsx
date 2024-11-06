'use client';

// import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

/*const RPanelProfile = () => {
  // Define the R-Panel profile points with accurate dimensions
  const profilePoints = [
    new THREE.Vector3(0, 0, 0), // Point 1: Start of profile
    new THREE.Vector3(0.25, 1.25, 0), // Point 2: First rise to peak
    new THREE.Vector3(2.3125, 1.25, 0), // Point 3: Flat section at first peak
    new THREE.Vector3(3.0625, 0, 0), // Point 4: Drop down to first valley
    new THREE.Vector3(6.375, 0, 0), // Point 5: Flat valley section
    new THREE.Vector3(7.375, 1.25, 0), // Point 6: Rise to second peak
    new THREE.Vector3(11.375, 1.25, 0), // Point 7: Flat section at second peak
    new THREE.Vector3(12.4375, 0, 0), // Point 8: Drop down to valley
    new THREE.Vector3(24.4375, 0, 0), // Point 9: Flat valley section (middle)
    new THREE.Vector3(25.5, 1.25, 0), // Point 10: Rise to third peak
    new THREE.Vector3(29.5, 1.25, 0), // Point 11: Flat section at third peak
    new THREE.Vector3(30.5, 0, 0), // Point 12: Drop down to valley
    new THREE.Vector3(33.8125, 0, 0), // Point 13: Flat valley section
    new THREE.Vector3(34.5625, 1.25, 0), // Point 14: Final rise to peak
    new THREE.Vector3(36.625, 1.25, 0), // Point 15: Flat section at peak
    new THREE.Vector3(36.875, 0, 0), // Point 16: Drop to complete profile
  ];

  // Offset to center the profile within the 40-inch canvas
  const centerOffsetX = (40 - 36) / 2; // Centering offset for 36-inch profile in 40-inch canvas

  // Apply the offset to each point to center the profile
  const centeredPoints = profilePoints.map((point) =>
    point.clone().add(new THREE.Vector3(centerOffsetX, 0, 0))
  );

  return (
    <Line
      points={centeredPoints} // Array of Vector3 points
      color="blue" // Color of the line
      lineWidth={1} // Line width for visual clarity
    />
  );
};*/

/*const Helpers = () => {
  return (
    <>
      <gridHelper args={[40, 20]} />

      <axesHelper args={[20]} />
    </>
  );
};*/

export const CoreCodeCanvas = ({ id }: { id: string }) => {
  // <ambientLight intensity={0.5} />
  // <pointLight position={[1000, 1000, 1000]} />
  // <RPanelProfile />
  // <Helpers />
  return (
    <Canvas
      className="aspect-video"
      camera={{ position: [0, 0, 25], fov: 50, near: 0.1, far: 100 }}
    >
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};
