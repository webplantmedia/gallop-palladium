export const connectPoints = (coords: any) => {
  let cumulativeX = 0;

  return coords.map((coord: any) => {
    const point = { x: cumulativeX + coord.x, y: coord.y };
    cumulativeX += coord.x;
    return point;
  });
};
