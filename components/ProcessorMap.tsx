"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import {Map, Marker } from "react-map-gl/mapbox";


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProcessorMap({ processors }: { processors: any[] }) {
  return (
    <div className="h-96 border rounded-md overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 78.9629, latitude: 20.5937, zoom: 4 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {processors.map((p, i) => (
          <Marker key={i} longitude={p.lng} latitude={p.lat} color="blue" />
        ))}
      </Map>
    </div>
  );
}
