import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useGetUserActivityQuery } from '../slices/activityApiSlice'

import "../styles/map.css";

const MapsScreen = () => {
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();

    const markers = [];
    const { data: userActivities, isLoading, error, status } = useGetUserActivityQuery({}, {
        pollingInterval: 15000,
        skip: false,
        refetchOnMountOrArgChange: true
    })




    const onLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAd235ZXhYOAPNZKrNxgGu5g3ZKef9TiRg',
    });
    //const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    const handleMarkerClick = (id, lat, lng, title) => {
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, title });
        setIsOpen(true);
    };
    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {userActivities && (
                        <GoogleMap mapContainerClassName="map-container" onLoad={onLoad} onClick={() => setIsOpen(false)}>

                            <>

                                {(userActivities.map((act) => {
                                    if (act.start_latlng.length != 0) {
                                        markers.push({ lat: act.start_latlng[0], lng: act.start_latlng[1], title: act.name })
                                    }
                                }))}
                                {
                                    markers.map(({ lat, lng, title }, ind) => (
                                        <Marker
                                            position={{ lat, lng }}
                                            key={ind}
                                            onClick={() => {
                                                handleMarkerClick(ind, lat, lng, title);
                                            }}

                                        >
                                            {isOpen && infoWindowData?.id === ind && (
                                                <>
                                                    <InfoWindow
                                                        onCloseClick={() => {
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        <h3>{infoWindowData.title}</h3>
                                                    </InfoWindow>
                                                </>
                                            )}
                                        </Marker>
                                    ))
                                }
                                onlo
                            </>

                        </GoogleMap>
                    )
                    }
                </>
            )}
        </div>
    );
};

export default MapsScreen;