import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spin, Table } from 'antd';
import apiMethods from '../../../api-methods';
import {API} from '../../../htcore';

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
        title: 'From',
        dataIndex: 'fromDate',
        key: 'fromDate',
    },
    {
        title: 'To',
        dataIndex: 'toDate',
        key: 'toDate',
    },
    {
        title: 'Percentage',
        dataIndex: 'percentage',
        key: 'percentage',
    }
];

const CancellationPoliciesPage = () => {
    const {propertyId} = useParams();
    const [cancellationPolicies, setCancellationPolicies] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.CANCELLATION_POLICIES(propertyId),
            success: setCancellationPolicies
        });
    }, []);

    if (!cancellationPolicies) {
        return <Spin />;
    }

    return (
        <>
            <Table
                dataSource={cancellationPolicies}
                columns={columns}
                pagination={false}
            />
        </>
    );
};

export default CancellationPoliciesPage;
