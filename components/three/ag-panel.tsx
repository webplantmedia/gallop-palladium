'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Environment, Line } from '@react-three/drei';
import classNames from 'classnames';
import * as THREE from 'three';
import { Dimension, Label } from '@components/three';

export const AGPanel = () => {
  const Profile = () => {
    const largePeakHeight = 0.75;
    const largePeakHalfLength = 0.25;
    const largeSlopeLength = 0.6;

    const largeRidgeHeight = 0.6;
    const largeRidgeHalfLength = 0.25;
    const largeRidgeSlopeLength = 0;

    const smallPeakHeight = 0.25;
    const smallPeakLength = 0.75;
    const smallSlopeLength = 0.3;

    const valleyLength = 1.3;
    const valleyMiddleLength = 1.5;

    const startLength = largeSlopeLength * 0.9;
    const startHeight =
      largePeakHeight - (largePeakHeight * startLength) / largeSlopeLength;
    const xAxisOffset =
      startLength + largePeakHalfLength + largeRidgeHalfLength;

    let points: { x: number; y: number }[] = [];

    const beginning = [
      { x: 0, y: startHeight },
      { x: startLength, y: largeRidgeHeight },
      { x: largeRidgeHalfLength, y: largeRidgeHeight },
      { x: largeRidgeSlopeLength, y: largePeakHeight },
      { x: largePeakHalfLength, y: largePeakHeight },
    ];

    const middle = [
      { x: largePeakHalfLength, y: largePeakHeight },
      { x: largeRidgeSlopeLength, y: largeRidgeHeight },
      { x: largeRidgeHalfLength, y: largeRidgeHeight },
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
      { x: largeSlopeLength, y: largeRidgeHeight },
      { x: largeRidgeHalfLength, y: largeRidgeHeight },
      { x: largeRidgeSlopeLength, y: largePeakHeight },
      { x: largePeakHalfLength, y: largePeakHeight },
    ];

    let end = [
      { x: largePeakHalfLength, y: largePeakHeight },
      { x: largeRidgeSlopeLength, y: largeRidgeHeight },
      { x: largeRidgeHalfLength, y: largeRidgeHeight },
      { x: largeSlopeLength, y: 0 },
      { x: startLength, y: 0 },
    ];

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
    for (let i = 0; i < 4; i++) {
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
        <Dimension start={[0, 2, 0]} end={[9, 2, 0]} text='9"' />
        <Dimension start={[-18, 4, 0]} end={[18, 4, 0]} text='36"' />
        <Dimension
          start={[-20, -1, 0]}
          end={[-20, -0.25, 0]}
          text='¾"'
          direction="vertical"
          textPosition="below"
        />
        <Label
          start={[19.5, -1, 0]}
          end={[18, -5, 0]}
          text="Purlin Bearing Leg"
          space={1}
          align="left"
        />
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
    </div>
  );
};
