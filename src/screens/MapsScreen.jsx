import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "../styles/map.css";


const MapsScreen = () => {

    const markers = [
        { lat: 18.5204, lng: 73.8567 },
        { lat: 18.5314, lng: 73.8446 },
        { lat: 18.5642, lng: 73.7769 },
    ];

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAd235ZXhYOAPNZKrNxgGu5g3ZKef9TiRg',
    });
    //const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
                    {markers.map(({ lat, lng }) => (
                        <Marker position={{ lat, lng }} />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default MapsScreen;