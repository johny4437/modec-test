import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { WEATER_API_KEY} from '../../keys'

// STYLE CSS
import './style.css'

function Map(){
    const history = useHistory()
    const [coordinates, setCoordinates] = React.useState({
          latitude: 37.78825,
          longitude: -122.4324
    });
    const [showName, setShowName] = React.useState(false)
    const [cities, setCities] =  React.useState([])
    
    const {latitude, longitude} = coordinates;
    
   


    
   


    // FUNCTION TO GET THE MARKER POSITION
    const onMarkerDragEnd = (event) =>{
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng()
  
        setCoordinates({
            latitude:latitude,
            longitude:longitude
        })
    }
    const getWheater = async ()=>{
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${WEATER_API_KEY}`
        const response = await axios.get(url)
        setCities(response.data.list)
        setShowName(true)
        
    }
    const selectCity = (chave) =>{
        console.log(cities[chave])
        localStorage.setItem('city',JSON.stringify(cities[chave]));
        history.push('/city');
        setShowName(false)
        
    }
    
    return(
        <div  className="container">
            <div className="map-component">
                    <div className="google-map">
                        <GoogleMap
                        defaultCenter={{ lat: 37.78825, lng: -122.4324 }}
                        defaultZoom={8}
                        >
                            
                            <Marker
                            draggable={true}
                            position={{ 
                                lat: latitude, 
                                lng: longitude
                            }}
                            title="Here"
                            onDragEnd={onMarkerDragEnd} 
                            />
                        </GoogleMap>
                    </div>
                    <div className="text-information">
                       
                    </div>
                    
            </div>    
            <div className="information">
                        <a className="button-search" 
                        onClick={()=>getWheater()} > 
                                <span>Search</span>  
                                <SearchIcon className="icon"/>   
                        </a>
                <div className="list-city">
                {showName && <div className="title-city"><span>All cities</span></div>}
                    { cities.map((c,i)=>(   
                    <div key={i} className="all-cities">
                        <ul>
                            <li><a href=""   onClick={()=>selectCity(i)}>{c.name}</a></li>
                        </ul>
                    </div>
                    ))}
                </div>
            </div>
                    
        </div>
    );
}

export default Map;