import React from 'react';
import './style.css'
const CityInformation = () =>{

    const [cities, setCities] = React.useState({
        name:"",
        max_temp:"",
        min_temp:""
    });
    
    const {name, max_temp, min_temp} = cities;
    React.useEffect(()=>{
        const response = JSON.parse(localStorage.getItem('city'));

        setCities({...cities, 
            name:response.name, 
            max_temp:response.main.temp_max,
             min_temp:response.main.temp_min
            })
       
       
    },[])

    // FUNCTION TO CONVERT KELVIN to Celsius
    const changeTemperature = (degrees) =>{
      const temp = degrees-273.15;
        return temp;
    }
    
    return(
        <div className={(changeTemperature(min_temp) < 15  ) ? 'city-container':'app-warm'}>
            <div className="title">
                <span>City Information</span>
            </div>
            <div className="city-detail">
                <div className="city-name">
                    <span>{name}</span>
                </div>
                <div className="temp-information">
                    <h4>Max Temperature:</h4><span>{Math.round(changeTemperature(max_temp))} ºC</span>
                
                    <h4>Min Temperature:</h4><span>{Math.round(changeTemperature(min_temp))} ºC</span>
                </div>
                
            </div>
            
        </div>
    );
}
export default CityInformation;