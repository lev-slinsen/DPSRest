import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs,
} from "react-google-maps";

const MAPURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
export const GOOGLE_API_KEY = "AIzaSyDdg7ToSLq8ZdJmpkx1b2SqC6wH8orEEQQ";

export interface I_state {
    coord: {lat: number,
    lng: number},
    zoom: number
}

class Map extends Component {
    state:I_state = {
        coord: { lat: 40.756795, lng: -73.954298 },
        zoom: 13
    };

    render() {

        return(
            <div>
                <h2>!!!!!!!!!THIS IS MAP!!!!!</h2>
                {/*
                // @ts-ignore*/}
                <MapComponent lat={this.state.coord.lat} lng={this.state.coord.lng}/>
            </div>
        );
    }
};


const MapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({ lat, lng }:any) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
        <Marker position={{ lat, lng }} />
    </GoogleMap>
));

export default Map;