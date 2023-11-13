export function boundsFromCoords(coords: [number, number][]): [[number, number], [number, number]] {
  const topLeft = coords[0];
  const bottomRight = coords[2];

  return [[topLeft[1], topLeft[0]], [bottomRight[1], bottomRight[0]]];
}
