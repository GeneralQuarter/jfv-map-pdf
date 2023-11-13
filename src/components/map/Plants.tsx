import { FC, useMemo } from 'react';
import { Plant } from '../../lib/API';
import { useSettings } from '../../hooks/use-settings';
import circle from '@turf/circle';
import { Source, Layer } from 'react-map-gl/maplibre';

type PlantsProps = {
  plants: Plant[];
}

const plantsToFeatureCollection = (plants: Plant[], showCanopy: boolean) => {
  return {
    type: 'FeatureCollection',
    features: plants.map(plant => circle(
      [plant.position[1], plant.position[0]],
      (showCanopy || plant.width < 2 ? plant.width : 2) / 2000,
      {
        properties: {
          id: plant.id,
          code: plant.code,
        }
      }
    ))
  }
}

const Plants: FC<PlantsProps> = ({ plants }) => {
  const {settings: {showCanopy}} = useSettings();
  const plantsFeatureCollection = useMemo(() => plantsToFeatureCollection(plants, showCanopy), [plants, showCanopy]);

  return <Source id="plants" type="geojson" data={plantsFeatureCollection}>
    <Layer 
      id='plant-outlines'
      type='line'
      paint={{
        'line-color': 'gray'
      }}
    />
    <Layer 
      id='plant-codes'
      type='symbol'
      layout={{
        'text-field': ['get', 'code'],
        'text-allow-overlap': true,
        'text-padding': 0,
      }}
    />
  </Source>;
}

export default Plants;
