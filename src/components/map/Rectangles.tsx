import { FC, useMemo } from 'react';
import { Rectangle } from '../../lib/API';
import { Source, Layer } from 'react-map-gl/maplibre';

type RectanglesProps = {
  rectangles: Rectangle[];
}

const rectanglesToFeatureCollection = (rectangles: Rectangle[]) => {
  return {
    type: 'FeatureCollection',
    features: rectangles.map(rectangle => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          rectangle.coords.map(coords => [coords[1], coords[0]])
        ]
      },
      properties: {}
    })),
  };
}

const Rectangles: FC<RectanglesProps> = ({ rectangles }) => {
  const rectangleFeatureCollection = useMemo(() => rectanglesToFeatureCollection(rectangles), [rectangles]);

  return <Source id="rectangles" type="geojson" data={rectangleFeatureCollection}>
    <Layer 
      id='rectangle-fill'
      beforeId='plant-outlines'
      type='fill'
      paint={{
        'fill-color': 'olive',
        'fill-opacity': 0.2,
      }}
    />
  </Source>;
}

export default Rectangles;
