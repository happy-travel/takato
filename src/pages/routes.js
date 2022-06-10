import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TitlePage from './title/title-page';
import PropertiesPage from './property/property-routing';
import Country from './country/country-routing';
import RoomTypePage from './room-type/room-type-routing';
import MealPlanPage from './meal-plan/meal-plan-routing';

import NotFoundPage from './service/not-found-page';

const RoutesPage = () => (
    <Routes>
        <Route path='/' element={ <TitlePage /> } />
        <Route path='/property/*' element={ <PropertiesPage /> } />
        <Route path='/country/*' element={ <Country /> } />
        <Route path='/room-type/*' element={ <RoomTypePage /> } />
        <Route path='/meal-plan/*' element={ <MealPlanPage /> } />
        <Route path='/*' element={ <NotFoundPage /> } />
    </Routes>
);

export default RoutesPage;
