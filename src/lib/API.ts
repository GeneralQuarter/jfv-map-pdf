export type Plant = {
  id: string;
  code: string;
  fullLatinName: string;
  commonName: string;
  sponsor: string;
  width: number;
  height: number;
  position: [lat: number, lon: number];
  sourceLinks: string[];
  tags: string[];
}

export type Rectangle = {
  id: string;
  label: string;
  code: string;
  width: number;
  length: number;
  coords: [lat: number, lon: number][];
}

export type Hedge = {
  id: string;
  name: string;
  coords: [
    lat: number,
    lon: number
  ][];
  wateredAt?: string;
}

export type MapZone = {
  id: string;
  name: string;
  orientation: 'landscape' | 'portrait';
  coords: [lat: number, lon: number][];
}

export function getPlants(): Promise<Plant[]> {
  return getEntries('/plants-with-position');
}

export function getRectangles(): Promise<Rectangle[]> {
  return getEntries('/rectangles-with-coords');
}

export function getHedges(): Promise<Hedge[]> {
  return getEntries('/hedges');
}

export function getMapZones(): Promise<MapZone[]> {
  return getEntries('/map-zones');
}

function getEntries<T extends object>(path: string): Promise<T[]> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL ?? ''}${path}`)
    .then(data => data.json())
    .then(data => data.items);
}
