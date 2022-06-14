import React from 'react';
import apiMethods from '../../api-methods';
import { EntitySelector, useSelector } from '../selector';

const CountrySelector = (props) => {
    const { options, loading } = useSelector(apiMethods.COUNTRIES());

    return (
        <EntitySelector
            placeholder="Select Country"
            {...props}
            options={options}
            loading={loading}
        />
    );
};

export default CountrySelector;
