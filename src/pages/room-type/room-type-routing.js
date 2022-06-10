import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RoomTypes from './room-types';
import RoomType from './room-type';

const RoomTypeRouting = () => (
    <Routes>
        <Route path='/' element={ <RoomTypes /> } />
        <Route path='/:id' element={ <RoomType /> } />
    </Routes>
);

export default RoomTypeRouting;
