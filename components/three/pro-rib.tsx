'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import {
  Dimension,
  Label,
  shapeGeometry,
  connectPoints,
  borderGeometry,
} from '@components/three';

export const ProRib = () => {
  const [draw, setDraw] = useState<'wire' | 'detail'>('detail');

  const Profile = () => {
    const largePeakHeight = 0.75;
    const largePeakHalfLength = 0.4;
    const largeSlopeLength = 0.7;

    const smallPeakHeight = 0.25;
    const smallPeakLength = 0.75;
    const smallSlopeLength = 0.3;

    const valleyLength = 1.3;
    const valleyMiddleLength = 1.5;

    const startLength = largeSlopeLength * 0.9;
    const startHeight =
      largePeakHeight - (largePeakHeight * startLength) / largeSlopeLength;
    const xAxisOffset = startLength + largePeakHalfLength;
    const panelDepth = 20;

    let coords: { x: number; y: number }[] = [];

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

    let end = [
      { x: largePeakHalfLength, y: largePeakHeight },
      { x: largeSlopeLength, y: 0 },
      { x: startLength, y: 0 },
    ];

    coords = coords.concat(beginning);
    for (let i = 0; i < 4; i++) {
      coords = coords.concat(middle);
    }
    coords = coords.concat(end);

    const points = connectPoints(coords);
    let geometry = shapeGeometry(points, panelDepth);

    geometry.translate(-18 - xAxisOffset, -1, 0);

    const DrawProfile = () => {
      if (draw === 'detail') {
        const material = new THREE.MeshStandardMaterial({
          color: '#873F39',
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
            <mesh geometry={geometry} material={material} />
            <mesh geometry={geometry} material={material2} />
          </group>
        );
      }

      const wireMaterial = borderGeometry(geometry);

      return <primitive object={wireMaterial} />;
    };

    return (
      <group>
        <Dimension
          start={[0, 1, panelDepth / 2]}
          end={[9, 1, panelDepth / 2]}
          text='9"'
        />
        <Dimension
          start={[-18, 4, panelDepth / 2]}
          end={[18, 4, panelDepth / 2]}
          text='36"'
        />
        <Dimension
          start={[-20, -1, panelDepth / 2]}
          end={[-20, -0.25, panelDepth / 2]}
          text='¾"'
          direction="vertical"
          textPosition="below"
        />
        <Label
          start={[19.5, -1, panelDepth / 2]}
          end={[18, -5, panelDepth / 2]}
          text="Purlin Bearing Leg"
          space={1}
          align="left"
        />
        <DrawProfile />
      </group>
    );
  };
  return (
    <div className="aspect-video relative !p-0 z-0">
      <Canvas
        className="w-full h-full bg-base-card rounded-sm"
        camera={{ position: [0, 5, 45], fov: 40, near: 0.1, far: 100 }}
        style={{ padding: 0 }}
      >
        <Profile />
        <OrbitControls
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.3}
        />
        <directionalLight position={[20, 10, 0]} intensity={1} color="white" />
        <directionalLight position={[-20, 40, 0]} intensity={3} color="white" />
        <directionalLight position={[20, 10, 0]} intensity={1} color="white" />
        <directionalLight
          position={[-20, -40, 0]}
          intensity={1}
          color="white"
        />
        <directionalLight position={[30, -40, 0]} intensity={1} color="white" />
      </Canvas>
      <div className="absolute top-2 left-2 flex gap-2">
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md border-2',
            draw === 'wire'
              ? 'bg-base-card text-primary-main border-primary-main hover:bg-white/30'
              : 'bg-primary-contrast text-primary-main hover:bg-gray-50 border-transparent'
          )}
          onClick={() =>
            setDraw((value) => (value === 'detail' ? 'wire' : 'detail'))
          }
        >
          Wire
        </button>
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <span
          className={classNames(
            'bg-base-card block rounded-md overflow-hidden border-2 border-transparent'
          )}
        >
          <span
            className={classNames(
              'block text-base-contrast font-bold text-xs bg-white/30 px-3 py-1'
            )}
          >
            Pro-Rib
          </span>
        </span>
      </div>
    </div>
  );
};
