import React, { useState, useEffect } from 'react';
import {Breadcrumb, Button, Form, Input, message, Spin, Typography} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiMethods from '../../api-methods';
import { API } from '../../htcore';

const { Title } = Typography;

const MealPlanPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [mealPlan, setMealPlan] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.MEAL_PLANS(),
            success: (mealPlans) => {
                setMealPlan(mealPlans.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
    }, []);

    const submit = (values) => {
        const body =  {
            ...mealPlan,
            ...values,
        };
        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.MEAL_PLAN(id),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.MEAL_PLANS(),
                body,
                success: () => {
                    message.success('Created');
                    navigate('./..');
                }
            });
        }
    };

    const remove = () => {
        API.delete({
            komoro_url: apiMethods.MEAL_PLAN(id),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((id !== 'create') && !mealPlan) {
        return <Spin />;
    }

    return (
        <div className="page-content">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="./..">
                        Meal Plans
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{id}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={2}>Meal Plan</Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={mealPlan}
                onFinish={submit}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input placeholder="Enter Meal Plan Name" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
            { (id !== 'create') &&
                <div className="remove-holder">
                    <Button onClick={remove}>
                        Remove
                    </Button>
                </div>
            }
        </div>
    );
};

export default MealPlanPage;
