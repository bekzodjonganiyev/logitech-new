import L from "leaflet";

import icon from "../../../public/images/location-marker.png"
import { Marker } from "react-leaflet";

type LocationMarkerProps = {
    pos: [number, number],
    onMove: (arr: [number, number]) => void
}

const customIcon = new L.Icon({
    iconUrl: icon.src,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
});

export function LocationMarker(props: LocationMarkerProps) {
    return (
        <Marker
            position={props.pos}
            draggable
            autoPan
            eventHandlers={{
                moveend: (event) => {
                    props.onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
                },
            }}
            icon={customIcon}
        />
    );
}