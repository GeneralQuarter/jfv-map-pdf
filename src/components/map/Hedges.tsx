import { FC } from 'react';
import { Hedge } from '../../lib/API';
import buffer from '@turf/buffer';
import { Source, Layer } from 'react-map-gl/maplibre';

type HedgesProps = {
  hedges: Hedge[];
};

const hedgesToFeatureCollection = (hedges: Hedge[]) => {
  return {
    type: 'FeatureCollection',
    features: hedges.map(hedge => ({
      ...buffer({
        type: 'LineString',
        coordinates: hedge.coords.map(coords => [coords[1], coords[0]]),
      }, 0.8 / 1000),
      properties: {
        id: hedge.id,
        label: hedge.name,
      }
    })),
  }
}

const Hedges: FC<HedgesProps> = ({ hedges }) => {
  const hedgeFeatureCollection = hedgesToFeatureCollection(hedges);

  return <Source id="hedges" type="geojson" data={hedgeFeatureCollection}>
  <Layer 
    id='hedge-fill'
    type='fill'
    paint={{
      'fill-color': 'brown',
      'fill-opacity': 0.2
    }}
  />
  <Layer 
    id='hedge-name'
    type='symbol'
    layout={{
      'text-field': ['get', 'label'],
      'symbol-placement': 'line',
      'text-offset': [0, 1],
      'symbol-spacing': 180,
      'text-allow-overlap': true,
    }}
    paint={{
      'text-color': 'brown',
    }}
  />
</Source>;
}

export default Hedges;
