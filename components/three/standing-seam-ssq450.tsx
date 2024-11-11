'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { shapeGeometry, smoothPoints } from '@components/three';

export const StandingSeamSSQ450 = () => {
  const Profile = () => {
    const coords = [
      { x: 0, y: 2 },
      { x: 0, y: 0 },
      { x: 17, y: 0 },
      { x: 17.2, y: 2.2 },
      { x: 17.4, y: 2.2 },
      { x: 17.6, y: 0.1 },
    ];

    let points = smoothPoints(coords);
    let geometry = shapeGeometry(points, 20);
    geometry.translate(-9, -1, 0);

    const back = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.BackSide,
    });

    const front = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.FrontSide,
    });

    return (
      <group>
        <mesh geometry={geometry} material={front} />
        <mesh geometry={geometry} material={back} />
      </group>
    );
  };
  return (
    <div className="aspect-video relative !p-0 z-0">
      <Canvas
        className="w-full h-full bg-base-card rounded-sm"
        camera={{ position: [0, 8, 30], fov: 40, near: 0.1, far: 100 }}
        style={{ padding: 0 }}
      >
        <Profile />
        <OrbitControls
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.3}
        />
        <directionalLight position={[0, -40, 0]} intensity={1} color="white" />
        <ambientLight intensity={0.5} color="white" />
        <Environment
          preset="studio"
          environmentIntensity={0.3}
          background={false}
        />
      </Canvas>
      <div className="absolute top-2 right-2 flex gap-2">
        <span
          className={classNames(
            'bg-base-card block rounded-md overflow-hidden'
          )}
        >
          <span
            className={classNames(
              'block text-base-contrast font-normal text-xs bg-white/30 px-3 py-1'
            )}
          >
            Standing Seam Profile
          </span>
        </span>
        <span
          className={classNames(
            'bg-base-card block rounded-md overflow-hidden'
          )}
        >
          <span
            className={classNames(
              'block text-base-contrast font-bold text-xs bg-white/30 px-3 py-1'
            )}
          >
            SSQ450
          </span>
        </span>
      </div>
    </div>
  );
};
