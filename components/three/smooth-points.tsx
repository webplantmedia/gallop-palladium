import * as THREE from 'three';

export const smoothPoints = (coords: any, radius: number = 0.3) => {
  const roundedCornerPoints = [];

  for (let i = 1; i < coords.length - 1; i++) {
    const prev = new THREE.Vector3(coords[i - 1].x, coords[i - 1].y, 0);
    const current = new THREE.Vector3(coords[i].x, coords[i].y, 0);
    const next = new THREE.Vector3(coords[i + 1].x, coords[i + 1].y, 0);

    const dirToPrev = prev.clone().sub(current).normalize();
    const dirToNext = next.clone().sub(current).normalize();

    const angle = dirToPrev.angleTo(dirToNext);
    if (angle < Math.PI * 0.1) {
      roundedCornerPoints.push(current);
      continue;
    }

    const maxRadius =
      Math.min(prev.distanceTo(current), next.distanceTo(current)) / 2;
    const adjustedRadius = Math.min(radius, maxRadius);

    const cornerStart = current
      .clone()
      .add(dirToPrev.multiplyScalar(adjustedRadius));
    const cornerEnd = current
      .clone()
      .add(dirToNext.multiplyScalar(adjustedRadius));

    roundedCornerPoints.push(cornerStart);

    const cornerCurve = new THREE.QuadraticBezierCurve3(
      cornerStart,
      current,
      cornerEnd
    );

    roundedCornerPoints.push(...cornerCurve.getPoints(10));
    roundedCornerPoints.push(cornerEnd);
  }

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
