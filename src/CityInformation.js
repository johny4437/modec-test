import React from 'react';

const City = () =>{

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
    console.log(cities.name)
    return(
        <div>
            <h4>Cities</h4>
            <h4>{name}</h4>
            <br/>
            <h4>{max_temp}</h4>
            <br/>
        </div>
    );
}
export default City;