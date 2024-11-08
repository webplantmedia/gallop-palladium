import * as THREE from 'three';
export const smoothPoints = (coords: { x: number; y: number }[]) => {
  const roundedCornerPoints: THREE.Vector3[] = [];

  const radius = 0.3; // Adjust this for the size of the rounded corners

  for (let i = 1; i < coords.length - 1; i++) {
    const prev = new THREE.Vector3(coords[i - 1].x, coords[i - 1].y, 0);
    const current = new THREE.Vector3(coords[i].x, coords[i].y, 0);
    const next = new THREE.Vector3(coords[i + 1].x, coords[i + 1].y, 0);

    // Calculate direction vectors
    const dirToPrev = current.clone().sub(prev).normalize();
    const dirToNext = current.clone().sub(next).normalize();

    // Compute corner start and end points
    const cornerStart = current.clone().sub(dirToPrev.multiplyScalar(radius));
    const cornerEnd = current.clone().sub(dirToNext.multiplyScalar(radius));

    roundedCornerPoints.push(cornerStart);

    // Create a curve for the corner
    const cornerCurve = new THREE.QuadraticBezierCurve3(
      cornerStart,
      current,
      cornerEnd
    );

    // Add interpolated points for the curve
    roundedCornerPoints.push(...cornerCurve.getPoints(10));

    roundedCornerPoints.push(cornerEnd);
  }

  // Add first and last points as straight lines
  roundedCornerPoints.unshift(new THREE.Vector3(coords[0].x, coords[0].y, 0));
  roundedCornerPoints.push(
    new THREE.Vector3(
      coords[coords.length - 1].x,
      coords[coords.length - 1].y,
      0
    )
  );

  return roundedCornerPoints;
};
