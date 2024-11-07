import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  start: [number, number, number]; // Start point of the dimension line
  end: [number, number, number]; // End point of the dimension line
  text: string; // Text label for the dimension
}

export const Dimension = ({ start, end, text }: Props) => {
  const midPoint = new THREE.Vector3()
    .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
    .multiplyScalar(0.5); // Calculate midpoint for placing the label

  const offset = 0.3; // Offset for perpendicular lines

  return (
    <group>
      {/* Perpendicular Line at Start */}
      <Line
        points={[
          [start[0], start[1] + offset, start[2]],
          [start[0], start[1] - offset, start[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Main Dimension Line */}
      <Line
        points={[
          [start[0], start[1], start[2]],
          [end[0], end[1], end[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Perpendicular Line at End */}
      <Line
        points={[
          [end[0], end[1] + offset, end[2]],
          [end[0], end[1] - offset, end[2]],
        ]}
        color="black"
        lineWidth={1}
      />

      {/* Text Label at Midpoint */}
      <Html position={[midPoint.x, midPoint.y, midPoint.z]} center>
        <div className="text-base-contrast bg-base-card p-1 rounded-sm text-xs select-none">
          {text}
        </div>
      </Html>
    </group>
  );
};
