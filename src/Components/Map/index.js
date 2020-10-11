import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

// STYLE CSS
import './style.css'

function Map(){
    const history = useHistory()
    const [coordinates, setCoordinates] = React.useState({
          latitude: -34.397,
          longitude: 150.644
    });

    const [showName, setShowName] = React.useState(false)
    const [cities, setCities] =  React.useState([])
    const {latitude, longitude} = coordinates;
    



    
   


    // FUNCTION TO GET THE MARKER POSITION
    const onMarkerDragEnd = (event) =>{
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng()
  
        console.log(latitude, longitude)
        setCoordinates({
            latitude:latitude,
            longitude:longitude
        })
    }
    const getWheater = async ()=>{
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=a9b88c94f977eb26eef4c7cfd359b2cd`
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
                        defaultCenter={{ lat: -34.397, lng: 150.644 }}
                        defaultZoom={8}>
                            <Marker
                            draggable 
                            position={{ 
                                lat: latitude, 
                                lng: longitude
                            }}
                            onDragEnd={(e)=>onMarkerDragEnd(e)} 
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
                            <li><a href="#"  target="_blank" onClick={()=>selectCity(i)}>{c.name}</a></li>
                        </ul>
                    </div>
                    ))}
                </div>
            </div>
                    
        </div>
    );
}

export default Map;