import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "../styles/map.css";


const MapsScreen = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAd235ZXhYOAPNZKrNxgGu5g3ZKef9TiRg',
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                />
            )}
        </div>
    );
};

export default MapsScreen;