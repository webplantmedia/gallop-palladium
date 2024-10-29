'use client';

import { useState } from 'react';

type Annotation = {
  label: string;
  x: number;
  y: number;
};

const annotations: Annotation[] = [
  { label: 'Painted Side', x: 15, y: 22 },
  { label: 'Purlin Bearing Leg on PBR only', x: 75, y: 28 },
  { label: '36"', x: 50, y: 12 },
  { label: '12"', x: 25, y: 12 },
  { label: '1¼"', x: 5, y: 32 },
];

export const CoreCodeSVG = ({ id }: { id: string }) => {
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(
    null
  );

  const handleMouseEnter = (label: string) => setHoveredAnnotation(label);
  const handleMouseLeave = () => setHoveredAnnotation(null);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">R-Panel or PBR-Panel Profile</h2>
      <div className="relative">
        <svg
          viewBox="0 0 120 40"
          className="w-full max-w-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corrected Metal Profile Outline with exact spacing */}
          <polyline
            points="0,30 2,25 6,25 8,30 12,30 14,25 18,25 20,30 24,30 26,25 30,25 32,30 36,30 38,25 42,25 44,30 48,30 50,25 54,25 56,30 60,30 62,25 66,25 68,30 72,30 74,25 78,25 80,30 84,30 86,25 90,25 92,30 96,30 98,25 102,25 104,30"
            fill="none"
            stroke="black"
            strokeWidth="0.8"
          />

          {/* Measurement Lines */}
          <line
            x1="10"
            y1="10"
            x2="110"
            y2="10"
            stroke="black"
            strokeWidth="0.5"
            markerEnd="url(#arrow)"
            markerStart="url(#arrow)"
          />
          <line
            x1="10"
            y1="15"
            x2="40"
            y2="15"
            stroke="black"
            strokeWidth="0.5"
            markerEnd="url(#arrow)"
            markerStart="url(#arrow)"
          />

          {/* Arrows for measurement indicators */}
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#000" />
            </marker>
          </defs>

          {/* Annotations */}
          {annotations.map((annotation, index) => (
            <text
              key={index}
              x={annotation.x}
              y={annotation.y}
              fontSize="3"
              fill="#333"
              onMouseEnter={() => handleMouseEnter(annotation.label)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              {annotation.label}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredAnnotation && (
          <div className="absolute top-0 left-0 mt-2 ml-4 p-1 bg-gray-100 border rounded text-xs text-center shadow-lg">
            {hoveredAnnotation}
          </div>
        )}
      </div>
    </div>
  );
};
