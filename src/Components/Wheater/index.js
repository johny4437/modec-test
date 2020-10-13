import React from  'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
import Map from '../Map/index';
import {GOOGLE_API_KEY} from '../../keys';

// STYLE CSS
import './style.css'

const Wheater = () =>{
    
    
    
    const WrapperMap = withScriptjs(withGoogleMap(Map));
    
    return(
    <div className="main">

    
        <div className="draw-map">
            <div className="title-info">
            <p>Drag the Marker choose a location and then press the
                Button Search to get the weather information about any city.
                To get more information about a especific city please just select the city when the list appear.
            </p>
            </div>
            <WrapperMap
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    </div>
    );
}
export default Wheater;