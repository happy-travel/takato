import React from 'react';
import apiMethods from '../../api-methods';
import { EntitySelector, useSelector } from '../selector';

const MealPlanSelector = (props) => {
    const { options, loading } = useSelector(apiMethods.MEAL_PLANS());

    return (
        <EntitySelector
            placeholder="Select Meal Plan"
            {...props}
            options={options}
            loading={loading}
        />
    );
};

export default MealPlanSelector;
