import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useParams } from "react-router-dom";
import { API } from '../../../htcore';
import apiMethods from '../../../api-methods';

const RoomPage = () => {
    const {propertyId, id} = useParams();

    const [room, setRoom] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOMS(propertyId),
            success: (rooms) => {
                setRoom(rooms.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
    }, []);

    if (!room) {
        return <Spin />;
    }

    return (
        <>
            <div>In progress.</div>
            <pre>{JSON.stringify(room,1,2)}</pre>
        </>
    );
};

export default RoomPage;
