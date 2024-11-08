'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { Dimension, Label } from '@components/three';

export const StandingSeamSSQ100 = () => {
  const smoothPoints = (coords: { x: number; y: number }[]) => {
    const curvePoints = coords.map(
      (coord) => new THREE.Vector3(coord.x, coord.y, 0)
    );

    const curve = new THREE.CatmullRomCurve3(
      curvePoints,
      false,
      'chordal',
      0.1
    );

    // Generate more points along the curve to make it smooth
    return curve.getPoints(200); // Increase the number of segments for smoother geometry
  };

  const Profile = () => {
    let points: { x: number; y: number }[] = [];

    const middle = [
      { x: 1, y: 4 },
      { x: 0, y: 4 },
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 20, y: 4 },
      { x: 21, y: 4 },
      { x: 21, y: 3 },
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
      vertices.push(point.x, point.y, -10); // Bottom
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
    geometry.translate(-10.5, -1, 0.5);

    const material = new THREE.MeshStandardMaterial({
      color: '#873F39',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    /*const material2 = new THREE.MeshStandardMaterial({
      color: 'white',
      metalness: 0.1,
      roughness: 20,
      flatShading: true,
      side: THREE.FrontSide,
		});*/

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
    </div>
  );
};
