import { useCallback, useRef, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import StaticMapFeatures from './components/map/StaticMapFeatures';
import { useCachedApi } from './hooks/use-cached-api';
import { Hedge, MapZone, Plant, Rectangle, getHedges, getMapZones, getPlants, getRectangles } from './lib/API';
import Plants from './components/map/Plants';
import Settings from './components/Settings';
import Rectangles from './components/map/Rectangles';
import Hedges from './components/map/Hedges';
import { Map as MapLibre } from 'maplibre-gl';
import { useSettings } from './hooks/use-settings';
import MapZones from './components/map/MapZones';
import { boundsFromCoords } from './lib/bounds-from-coords';
import type { MapZoneWithImage } from './lib/map-zone-with-image';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MapZonePDF from './components/MapZonesPDF';

const A4pixels = [1240, 1754];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  const map = useRef<MapLibre | undefined>(undefined);
  const {settings: {showMapZones}} = useSettings();
  const plants = useCachedApi<Plant[]>('plants', getPlants, []);
  const rectangles = useCachedApi<Rectangle[]>('rectangles', getRectangles, []);
  const hedges = useCachedApi<Hedge[]>('hedges', getHedges, []);
  const mapZones = useCachedApi<MapZone[]>('mapZones', getMapZones, []);
  const [mapZonesWithImages, setMapZonesWithImages] = useState<MapZoneWithImage[] | undefined>(undefined);

  const generateImages = useCallback(async () => {
    const mapZoneImages: MapZoneWithImage[] = [];

    for (const mapZone of mapZones) {
      const bounds = boundsFromCoords(mapZone.coords);
      map.current?.fitBounds(bounds, {animate: false});
      await delay(500);
      mapZoneImages.push({
        ...mapZone,
        image: map.current?.getCanvas().toDataURL('image/png', 1) ?? '',
      });
    }

    setMapZonesWithImages(mapZoneImages);
  }, [map, mapZones]);

  return (
    <>
    <div className='controls'>
      <Settings />
      <button onClick={generateImages}>Generate images</button>
      {mapZonesWithImages && <PDFDownloadLink document={<MapZonePDF mapZones={mapZonesWithImages} />} fileName="JFVMapZones.pdf">
        {({ loading }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>}
    </div>
    <Map
      initialViewState={{
        longitude: 0.88279,
        latitude: 46.37926,
        zoom: 17
      }}
      mapStyle={{
        version: 8, glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf', sources: {}, layers: [{
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#fff' }
        }]
      }}
      style={{ width: A4pixels[0], height: A4pixels[1] }}
      onLoad={(e) => map.current = e.target}
      preserveDrawingBuffer={true}
    >
      <StaticMapFeatures />
      <Plants plants={plants} />
      {plants.length > 0 && <Rectangles rectangles={rectangles} />}
      {plants.length > 0 && rectangles.length > 0 && <Hedges hedges={hedges} />}
      {showMapZones && <MapZones mapZones={mapZones}/>}
    </Map>
  </>
  )
}

export default App
