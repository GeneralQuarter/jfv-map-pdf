import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SettingsProvider } from './contexts/settings.tsx'
import { MapProvider } from 'react-map-gl/maplibre'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </MapProvider>
  </React.StrictMode>,
)
