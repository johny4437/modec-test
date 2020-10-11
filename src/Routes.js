import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import MapG from './Map';
import City from './CityInformation';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Route component={MapG} path="/" exact/>
            <Route component={City} path="/city" exact/>
        </BrowserRouter>
    );
}

export default Routes;