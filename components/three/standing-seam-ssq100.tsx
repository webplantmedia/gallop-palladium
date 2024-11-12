'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { shapeGeometry, smoothPoints } from '@components/three';

export const StandingSeamSSQ100 = () => {
  const [shape, setShape] = useState<'unattached' | 'attached'>('unattached');
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (cameraRef.current) {
      if (shape === 'unattached') {
        cameraRef.current.position.set(0, 8, 30); // Position for 'unattached'
      } else {
        cameraRef.current.position.set(-5, 2, 20); // Position for 'attached'
      }

      // Optional: Smooth transition
      cameraRef.current.lookAt(0, 0, 0); // Ensure camera looks at the center
    }
  }, [shape]);

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

    let leftPoints = smoothPoints(left);
    let leftGeometry = shapeGeometry(leftPoints, 20);
    leftGeometry.translate(0, -1, 0);

    const leftMaterial = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    let rightPoints = smoothPoints(right);
    let rightGeometry = shapeGeometry(rightPoints, 20);
    rightGeometry.translate(0, -1, 0);

    const rightMaterial = new THREE.MeshStandardMaterial({
      color: '#a26762',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    return (
      <group>
        <mesh geometry={leftGeometry} material={leftMaterial} />
        <mesh geometry={rightGeometry} material={rightMaterial} />
      </group>
    );
  };
  const Profile = () => {
    const coords = [
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 0 },
      { x: 17, y: 0 },
      { x: 17, y: 2 },
      { x: 18, y: 2 },
      { x: 18, y: 1.7 },
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
      color: '#954f4a',
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
        onCreated={({ camera }) => {
          cameraRef.current = camera as THREE.PerspectiveCamera; // Explicit type cast
        }}
      >
        {shape === 'unattached' ? <Profile /> : <ProfileAttached />}
        <OrbitControls
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.3}
        />
        <directionalLight position={[20, 10, 0]} intensity={1} color="white" />
        <directionalLight position={[-20, 40, 0]} intensity={3} color="white" />
        <directionalLight position={[20, 10, 0]} intensity={1} color="white" />
        <directionalLight position={[0, -40, 0]} intensity={3} color="white" />
      </Canvas>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md',
            shape === 'attached'
              ? 'bg-primary-main text-primary-contrast'
              : 'bg-primary-contrast text-primary-main hover:bg-gray-50'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'attached' ? 'unattached' : 'attached'
            )
          }
        >
          Attached
        </button>
        <button
          className={classNames(
            'text-xs px-3 py-1 rounded-md',
            shape === 'attached'
              ? 'bg-primary-contrast text-primary-main hover:bg-gray-50'
              : 'bg-primary-main text-primary-contrast'
          )}
          onClick={() =>
            setShape((prevValue) =>
              prevValue === 'attached' ? 'unattached' : 'attached'
            )
          }
        >
          Unattached
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
