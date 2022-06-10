import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MealPlans from './meal-plans';
import MealPlan from './meal-plan';

const MealPlanRouting = () => (
    <Routes>
        <Route path='/' element={ <MealPlans /> } />
        <Route path='/:id' element={ <MealPlan /> } />
    </Routes>
);

export default MealPlanRouting;
