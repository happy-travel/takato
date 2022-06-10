import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spin, Table, Typography } from 'antd';
import { API } from '../../htcore';
import apiMethods from '../../api-methods';

const { Title } = Typography;

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
        title: 'Location',
        render: (text, record) => (<>
            {record.address.country.name}, {record.address.city}
        </>),
        key: 'age',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplierCode',
        key: 'supplierCode',
    },
    {
        title: 'Stars',
        dataIndex: 'starRating',
        key: 'starRating',
    },
];

const PropertiesPage = () => {
    const [properties, setProperties] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.PROPERTIES(),
            success: setProperties
        });
    }, []);

    if (!properties)
        return <Spin />;

    return (
        <div className="page-content">
            <Title>Properties</Title>
            <Table
                dataSource={properties}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
            <div className="actions-holder">
                <Link to="./create">
                    <Button>
                        Add Property
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PropertiesPage;
