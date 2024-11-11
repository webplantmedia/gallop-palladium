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
} from '@components/three';

export const RPanel = () => {
  const [shape, setShape] = useState<'r-panel' | 'pbr-panel'>('r-panel');

  const Profile = () => {
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
      { x: startLength, y: startHeight },
    ];

    if (shape === 'pbr-panel') {
      end = [
        { x: largePeakHalfLength, y: largePeakHeight },
        { x: largeSlopeLength, y: 0 },
        { x: startLength, y: 0 },
      ];
    }

    coords = coords.concat(beginning);
    for (let i = 0; i < 3; i++) {
      coords = coords.concat(middle);
    }
    coords = coords.concat(end);
    const points = connectPoints(coords);
    let geometry = shapeGeometry(points, panelDepth);

    geometry.translate(-18 - xAxisOffset, -1, 0);

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
        <Dimension
          start={[6, 2, panelDepth / 2]}
          end={[18, 2, panelDepth / 2]}
          text='12"'
        />
        <Dimension
          start={[-18, 4, panelDepth / 2]}
          end={[18, 4, panelDepth / 2]}
          text='36"'
        />
        <Dimension
          start={[-20, -1, panelDepth / 2]}
          end={[-20, 0.25, panelDepth / 2]}
          text='1¼"'
          direction="vertical"
          textPosition="below"
        />
        {shape === 'pbr-panel' && (
          <Label
            start={[20, -1, panelDepth / 2]}
            end={[18, -5, panelDepth / 2]}
            text="Purlin Bearing Leg"
            space={1}
            align="left"
          />
        )}
        <mesh geometry={geometry} material={material} />
        <mesh geometry={geometry} material={material2} />
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
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md',
            shape === 'r-panel'
              ? 'bg-primary-main text-primary-contrast'
              : 'bg-primary-contrast text-primary-main hover:bg-gray-50'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'r-panel' ? 'pbr-panel' : 'r-panel'
            )
          }
        >
          R-Panel
        </button>
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md',
            shape === 'r-panel'
              ? 'bg-primary-contrast text-primary-main hover:bg-gray-50'
              : 'bg-primary-main text-primary-contrast'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'r-panel' ? 'pbr-panel' : 'r-panel'
            )
          }
        >
          PBR-Panel
        </button>
      </div>
    </div>
  );
};
