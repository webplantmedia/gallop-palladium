'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { smoothPoints } from '@components/three';

export const StandingSeamSSQ100 = () => {
  const [shape, setShape] = useState<'unattached' | 'attached'>('unattached');

  function buildCoords(
    coords: Array<{ x: number; y: number }>
  ): { x: number; y: number }[] {
    return coords.map((coord) => {
      const point = { x: coord.x, y: coord.y };
      return point;
    });
  }

  const ProfileAttached = () => {
    const right = [
      { x: 0.2, y: 1.1 },
      { x: 0.2, y: 1.9 },
      { x: 0, y: 1.9 },
      { x: 0, y: 0 },
      { x: 9, y: 0 },
    ];

    const left = [
      { x: -9, y: 0 },
      { x: -0.1, y: 0 },
      { x: -0.1, y: 2 },
      { x: 0.3, y: 2 },
      { x: 0.3, y: 0.9 },
      { x: 0.1, y: 0.9 },
      { x: 0.1, y: 1.8 },
    ];

    const coords = buildCoords(right);

    let profilePoints = smoothPoints(coords);

    const vertices: number[] = [];
    const indices: number[] = [];

    profilePoints.forEach((point, i) => {
      vertices.push(point.x, point.y, 0); // Top
      vertices.push(point.x, point.y, -20); // Bottom
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
    geometry.translate(0, 4, 20);

    const material = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const coords2 = buildCoords(left);

    let profilePoints2 = smoothPoints(coords2);

    const vertices2: number[] = [];
    const indices2: number[] = [];

    profilePoints2.forEach((point, i) => {
      vertices2.push(point.x, point.y, 0); // Top
      vertices2.push(point.x, point.y, -20); // Bottom
      if (i < profilePoints2.length - 1) {
        const j = i * 2;
        indices2.push(j, j + 1, j + 2, j + 1, j + 3, j + 2);
      }
    });

    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices2, 3)
    );
    geometry2.setIndex(indices2);
    geometry2.computeVertexNormals();
    geometry2.translate(0, 4, 20);

    const material2 = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    return (
      <group>
        <mesh geometry={geometry} material={material} />
        <mesh geometry={geometry2} material={material2} />
      </group>
    );
  };
  const Profile = () => {
    let points: { x: number; y: number }[] = [];

    const middle = [
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 0 },
      { x: 17, y: 0 },
      { x: 17, y: 2 },
      { x: 18, y: 2 },
      { x: 18, y: 1.7 },
    ];

    function buildCoords(
      coords: Array<{ x: number; y: number }>
    ): { x: number; y: number }[] {
      return coords.map((coord) => {
        const point = { x: coord.x, y: coord.y };
        return point;
      });
    }

    for (let i = 0; i < 1; i++) {
      points = points.concat(middle);
    }

    const coords = buildCoords(points);

    let profilePoints = smoothPoints(coords);

    const vertices: number[] = [];
    const indices: number[] = [];

    profilePoints.forEach((point, i) => {
      vertices.push(point.x, point.y, 0); // Top
      vertices.push(point.x, point.y, -20); // Bottom
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
    geometry.translate(-9, -1, 10);

    const material = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    // <mesh geometry={geometry} material={material2} />
    return (
      <group>
        <mesh geometry={geometry} material={material} />
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
        {shape === 'unattached' ? <Profile /> : <ProfileAttached />}
        <OrbitControls
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.3}
        />
        <directionalLight position={[0, -40, 0]} intensity={1} color="white" />
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
            shape === 'unattached'
              ? 'bg-primary-contrast text-primary-main hover:bg-gray-50'
              : 'bg-primary-main text-primary-contrast'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'unattached' ? 'attached' : 'unattached'
            )
          }
        >
          {shape === 'unattached' ? 'Attached' : 'Unattached'}
        </button>
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
            SSQ100
          </span>
        </span>
      </div>
    </div>
  );
};
