import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, PageHeader, Spin, Table } from 'antd';
import { API } from '../../htcore';
import apiMethods from '../../api-methods';

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
];

const RoomTypesPage = () => {
    const [roomTypes, setRoomTypes] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOM_TYPES(),
            success: setRoomTypes
        });
    }, []);

    if (!roomTypes) {
        return <Spin />;
    }

    return (
        <div className="page-content">
            <PageHeader
                title="Room Types"
                extra={
                    <Link to="./create">
                        <Button>
                            Add Room Type
                        </Button>
                    </Link>
                }
            />
            <Table
                dataSource={roomTypes}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default RoomTypesPage;
