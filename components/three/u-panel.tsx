'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { Dimension, Label } from '@components/three';

export const UPanel = () => {
  const [shape, setShape] = useState<'u-panel' | 'pbu-panel'>('u-panel');

  const Profile = () => {
    const peakHeight = 0.75;
    const peakHalfLength = 0.515625;
    const slopeLength = 0.71875;
    const valleyLength = 3.53125;

    // const largePeakHeight = 1.25;
    // const largePeakHalfLength = 0.5;
    // const largeSlopeLength = 1.15625;

    // const smallPeakHeight = 0.25;
    // const smallPeakLength = 0.75;
    // const smallSlopeLength = 0.34375;

    // const valleyLength = 1.625;
    // const valleyMiddleLength = 5;

    const startLength = slopeLength * 0.4;
    const startHeight = peakHeight - (peakHeight * startLength) / slopeLength;
    const xAxisOffset = startLength + peakHalfLength;

    let points: { x: number; y: number }[] = [];

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
    for (let i = 0; i < 6; i++) {
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
    geometry.translate(-18 - xAxisOffset, -2, 0.5);

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
        <Dimension start={[6, 2, 0]} end={[12, 2, 0]} text='6"' />
        <Dimension start={[-18, 4, 0]} end={[18, 4, 0]} text='36"' />
        {shape === 'pbu-panel' && (
          <Label
            start={[19.3, -1, 0]}
            end={[18, -5, 0]}
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
    <div className="aspect-video relative !p-0">
      <Canvas
        className="w-full h-full bg-base-card rounded-sm"
        camera={{ position: [0, 20, 30], fov: 40, near: 0.1, far: 100 }}
        style={{ padding: 0 }}
      >
        <Profile />
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
