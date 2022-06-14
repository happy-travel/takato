import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Table, Button, PageHeader } from 'antd';
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
        title: 'Alpha2 Code',
        dataIndex: 'alpha2Code',
        key: 'alpha2Code',
    },
];

const CountriesPage = () => {
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.COUNTRIES(),
            success: setCountries
        });
    }, []);

    if (!countries) {
        return <Spin />;
    }

    return (
        <div className="page-content">
            <PageHeader
                title="Countries"
                extra={
                    <Link to="./create">
                        <Button>
                            Add Country
                        </Button>
                    </Link>
                }
            />
            <Table
                dataSource={countries}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default CountriesPage;
