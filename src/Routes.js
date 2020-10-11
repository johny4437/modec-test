import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import Wheater from './Components/Wheater';
import City from './Components/CityInformation';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Route component={Wheater} path="/" exact/>
            <Route component={City} path="/city" exact/>
        </BrowserRouter>
    );
}

export default Routes;