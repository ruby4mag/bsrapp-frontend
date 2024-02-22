import React, { useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useGetUserActivityQuery } from '../slices/activityApiSlice'

import "../styles/map.css";

const MapsScreen = () => {

    const markers = [];
    const { data: userActivities, isLoading, error, status } = useGetUserActivityQuery({}, {
        pollingInterval: 15000,
        skip: false,
        refetchOnMountOrArgChange: true
    })




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
                    {userActivities && (
                        <>

                            {(.map((act) => {
                                if (act.start_latlng.length != 0) {
                                    markers.push({ lat: act.start_latlng[0], lng: act.start_latlng[1] })
                                }
                            }))}
                            {
                                markers.map(({ lat, lng }) => (
                                    <Marker position={{ lat, lng }} />
                                ))
                            }
                        </>
                    )}
                </GoogleMap>
            )}
        </div>
    );
};

export default MapsScreen;