'use client';

import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import classNames from 'classnames';

interface Props {
  start: [number, number, number]; // Start point of the dimension line
  end: [number, number, number]; // End point of the dimension line
  text: string; // Text label for the dimension
  direction?: string;
  textPosition?: string;
}

export const Dimension = ({
  start,
  end,
  text,
  direction = 'horizontal',
  textPosition = 'in-line',
}: Props) => {
  const midPoint = new THREE.Vector3()
    .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
    .multiplyScalar(0.5); // Calculate midpoint for placing the label

  const offset = 0.3; // Offset for perpendicular lines

  return (
    <group>
      {direction === 'vertical' && (
        <Line
          points={[
            [start[0] + offset, start[1], start[2]],
            [start[0] - offset, start[1], start[2]],
          ]}
          color="black"
          lineWidth={1}
        />
      )}

      {direction === 'horizontal' && (
        <Line
          points={[
            [start[0], start[1] + offset, start[2]],
            [start[0], start[1] - offset, start[2]],
          ]}
          color="black"
          lineWidth={1}
        />
      )}

      <Line
        points={[
          [start[0], start[1], start[2]],
          [end[0], end[1], end[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {direction === 'vertical' && (
        <Line
          points={[
            [end[0] + offset, end[1], end[2]],
            [end[0] - offset, end[1], end[2]],
          ]}
          color="black"
          lineWidth={1}
        />
      )}

      {direction === 'horizontal' && (
        <Line
          points={[
            [end[0], end[1] + offset, end[2]],
            [end[0], end[1] - offset, end[2]],
          ]}
          color="black"
          lineWidth={1}
        />
      )}

      <Html
        position={
          textPosition === 'below'
            ? [midPoint.x, start[1] - 1.7, midPoint.z]
            : [midPoint.x, midPoint.y, midPoint.z]
        }
        center
      >
        <div
          className={classNames(
            'rounded-sm text-xs select-none',
            textPosition === 'in-line'
              ? 'text-base-contrast bg-base-card p-1'
              : 'text-base-contrast bg-transparent p-0'
          )}
        >
          {text}
        </div>
      </Html>
    </group>
  );
};
