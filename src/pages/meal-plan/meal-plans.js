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
    }
];

const MealPlansPage = () => {
    const [mealPlans, setMealPlans] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.MEAL_PLANS(),
            success: setMealPlans
        });
    }, []);

    if (!mealPlans) {
        return <Spin />;
    }

    return (
        <div className="page-content">
            <PageHeader
                title="Meal Plans"
                extra={
                    <Link to="./create">
                        <Button>
                            Add Meal Plan
                        </Button>
                    </Link>
                }
            />
            <Table
                dataSource={mealPlans}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default MealPlansPage;
