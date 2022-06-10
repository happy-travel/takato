import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spin, Table } from 'antd';
import { API } from '../../../htcore';
import apiMethods from '../../../api-methods';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        render: (text, record) => (
            <Link to={`./${record.id}`}>
                {record.id}
            </Link>
        ),
        key: 'id',
    },
    {
        title: 'Room Type',
        dataIndex: 'roomType',
        render: (text, record) => record.roomType.name,
        key: 'roomType',
    },
    {
        title: 'Occupancy',
        dataIndex: 'maximumOccupancy',
        render: (text, record) => record.maximumOccupancy[0].adults + ' + ' + record.maximumOccupancy[0].children,
        key: 'maximumOccupancy',
    }
];

const RoomsPage = () => {
    const {propertyId} = useParams();
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOMS(propertyId),
            success: setRooms
        });
    }, []);

    if (!rooms)
        return <Spin />;

    return (
        <>
            <Table
                dataSource={rooms}
                columns={columns}
                pagination={false}
            />
        </>
    );
};

export default RoomsPage;
