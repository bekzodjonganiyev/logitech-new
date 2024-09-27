import { useEffect } from "react";
import { TileLayer, useMap, useMapEvent } from "react-leaflet";

import 'leaflet/dist/leaflet.css';

import { LocationMarker } from "./location-marker";

export default function Map({ lat, lng, onMarkerChange }: { lat: number, lng: number, onMarkerChange: (a: [number, number]) => void }) {
    const map = useMap()
    const map1 = useMapEvent("moveend", (e) => console.log(e))

    useEffect(() => {
        map.flyTo([lat, lng], 17, { animate: true, duration: 1, noMoveStart: true })
    }, [lat, lng])

    return (
        <>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker
                pos={[lat, lng]}
                onMove={(a) => {
                    onMarkerChange(a)
                }}
            />

        </>
    );
}