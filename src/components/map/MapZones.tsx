import { FC, useMemo } from 'react';
import { MapZone } from '../../lib/API';
import { coordsToPolygonCoords } from '../../lib/coords-to-polygon-coords';
import { Source, Layer } from 'react-map-gl/maplibre';

type MapZonesProps = {
  mapZones: MapZone[];
};

const mapZonesToFeatureCollection = (mapZones: MapZone[]) => ({
  type: 'FeatureCollection',
  features: mapZones.map(mapZone => ({
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        coordsToPolygonCoords(mapZone.coords)
      ]
    }
  }))
})

const MapZones: FC<MapZonesProps> = ({ mapZones }) => {
  const mapZoneFeatureCollection = useMemo(() => mapZonesToFeatureCollection(mapZones), [mapZones]);

  return <Source id="map-zones" type="geojson" data={mapZoneFeatureCollection}>
    <Layer 
      id='map-zones'
      type='line'
      paint={{
        'line-color': 'black',
      }}
    />
  </Source>;
}

export default MapZones;
