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

export const UPanel = () => {
  const [shape, setShape] = useState<'u-panel' | 'pbu-panel'>('u-panel');

  const Profile = () => {
    const peakHeight = 0.75;
    const peakHalfLength = 0.515625;
    const slopeLength = 0.71875;
    const valleyLength = 3.53125;

    const startLength = slopeLength * 0.4;
    const startHeight = peakHeight - (peakHeight * startLength) / slopeLength;
    const xAxisOffset = startLength + peakHalfLength;
    const panelDepth = 20;

    let coords: { x: number; y: number }[] = [];

    const beginning = [
      { x: 0, y: startHeight },
      { x: startLength, y: peakHeight },
      { x: peakHalfLength, y: peakHeight },
    ];

    const middle = [
      { x: peakHalfLength, y: peakHeight },
      { x: slopeLength, y: 0 },
      { x: valleyLength, y: 0 },
      { x: slopeLength, y: peakHeight },
      { x: peakHalfLength, y: peakHeight },
    ];

    let end = [
      { x: peakHalfLength, y: peakHeight },
      { x: startLength, y: startHeight },
    ];

    if (shape === 'pbu-panel') {
      end = [
        { x: peakHalfLength, y: peakHeight },
        { x: slopeLength, y: 0 },
        { x: startLength, y: 0 },
      ];
    }

    coords = coords.concat(beginning);
    for (let i = 0; i < 6; i++) {
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
          end={[12, 2, panelDepth / 2]}
          text='6"'
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
        {shape === 'pbu-panel' && (
          <Label
            start={[19.3, -1, panelDepth / 2]}
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
            shape === 'u-panel'
              ? 'bg-primary-main text-primary-contrast'
              : 'bg-primary-contrast text-primary-main hover:bg-gray-50'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'u-panel' ? 'pbu-panel' : 'u-panel'
            )
          }
        >
          U-Panel
        </button>
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md',
            shape === 'u-panel'
              ? 'bg-primary-contrast text-primary-main hover:bg-gray-50'
              : 'bg-primary-main text-primary-contrast'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'u-panel' ? 'pbu-panel' : 'u-panel'
            )
          }
        >
          PBU-Panel
        </button>
      </div>
    </div>
  );
};
