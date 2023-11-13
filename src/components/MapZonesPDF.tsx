import { FC } from 'react';
import { Page, Image, Document } from '@react-pdf/renderer';
import { MapZoneWithImage } from '../lib/map-zone-with-image';

type PDFProps = {
  mapZones: MapZoneWithImage[];
};

const MapZonePDF: FC<PDFProps> = ({ mapZones }) => {
  return <Document>
    {mapZones.map(mapZone => (
      <Page size='A4' key={mapZone.id} dpi={150}>
        <Image src={mapZone.image} />
      </Page>
    ))}
  </Document>;
}

export default MapZonePDF;
