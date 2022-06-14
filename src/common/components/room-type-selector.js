import React from 'react';
import apiMethods from '../../api-methods';
import { EntitySelector, useSelector } from '../selector';

const RoomTypeSelector = (props) => {
    const { options, loading } = useSelector(apiMethods.ROOM_TYPES());

    return (
        <EntitySelector
            placeholder="Select Room Type"
            {...props}
            options={options}
            loading={loading}
        />
    );
};

export default RoomTypeSelector;
