export function coordsToPolygonCoords(coords: [number, number][]): [number, number][] {
  const polygonCoords = coords.map(c => [c[1], c[0]]) as [number, number][];
  polygonCoords.push(polygonCoords[0]);
  return polygonCoords;
}
