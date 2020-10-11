import React from  'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
import axios from 'axios';
import { useHistory} from 'react-router-dom';





const MapG = () =>{
    const history = useHistory();
    function Map(){
        const [coordinates, setCoordinates] = React.useState({
              latitude: -34.397,
              longitude: 150.644
        });

        const [cities, setCities] =  React.useState([])
      
        const {latitude, longitude} = coordinates;
      

        const onMarkerDragEnd = (event) =>{
            const latitude = event.latLng.lat();
            const longitude = event.latLng.lng()
      
            console.log(latitude, longitude)
            setCoordinates({
                latitude:latitude,
                longitude:longitude
            })
        }
     async   function getLocation (){
         const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=a9b88c94f977eb26eef4c7cfd359b2cd`
        const response = await axios.get(url)
            setCities(response.data.list)
        }
    const selectCity = (chave) =>{
        console.log(cities[chave])
        localStorage.setItem('city',JSON.stringify(cities[chave]));
        history.push('/city');
        
    }
        
        
          return(
              <>
              <GoogleMap
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
              defaultZoom={8}
              >
              <Marker
              draggable 
              position={{ 
                  lat: latitude, 
                  lng: longitude
                  }}
            onDragEnd={(e)=>onMarkerDragEnd(e)} 
            
              />
              </GoogleMap>
      <button onClick={()=>getLocation()} >Search</button>

    <div className="city">
        { cities.map((c,i)=>(
            <div key={i}>
            <ul>
                <li><a href="#" onClick={()=>selectCity(i)}>{c.name}</a></li>
            </ul>
            </div>
        ))}
    </div>

      </>
          );
         
      }
      const WrapperMap = withScriptjs(withGoogleMap(Map));
    
    return(
        <div style={{ height: '100vh', width: '100%' }}>
            <WrapperMap
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAtYkKFf2OBbrb4gwJTL__hZc6yYw95P5I`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            
            
            
            />
            
        </div>
    );
}
export default MapG;