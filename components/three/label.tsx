import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import classNames from 'classnames';

interface Props {
  start: [number, number, number]; // Start point of the dimension line
  end: [number, number, number]; // End point of the dimension line
  text: string; // Text label for the dimension
  align: string;
  space: number;
}

export const Label = ({ start, end, text, align, space }: Props) => {
  let position = new THREE.Vector3(end[0], end[1] - space, end[2]);

  return (
    <group>
      {/* Main Dimension Line */}
      <Line
        points={[
          [start[0], start[1], start[2]],
          [end[0], end[1], end[2]],
        ]}
        color="black"
        lineWidth={1}
      />
      <Html position={position} center>
        <div
          className={classNames(
            'text-base-contrast bg-base-card p-1 rounded-sm text-xs select-none text-nowrap whitespace-nowrap',
            'text-left -translate-x-1/3'
          )}
        >
          {text}
        </div>
      </Html>
    </group>
  );
};
