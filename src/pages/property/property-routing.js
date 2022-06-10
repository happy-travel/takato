import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Properties from './properties';
import PropertyPage from './property';

const PropertyRouting = () => (
    <Routes>
        <Route path='/' element={ <Properties /> } />
        <Route path='/:propertyId/*' element={ <PropertyPage /> } />
    </Routes>
);

export default PropertyRouting;
