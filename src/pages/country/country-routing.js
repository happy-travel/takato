import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Countries from './countries';
import Country from './country';

const CountryRouting = () => (
    <Routes>
        <Route path='/' element={ <Countries /> } />
        <Route path='/:id' element={ <Country /> } />
    </Routes>
);

export default CountryRouting;
