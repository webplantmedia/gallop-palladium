export const buildLatLngs = (points: any) => {
  let boundaryCoords: any = [];

  if (points) {
    for (var i = 0; i < points.length; i++) {
      let point = points[i].split(',');
      if (Array.isArray(point) && point.length == 3) {
        boundaryCoords.push(
          new google.maps.LatLng(parseFloat(point[1]), parseFloat(point[0]))
        );
      }
    }
  }

  return boundaryCoords;
};
