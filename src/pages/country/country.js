import React, { useState, useEffect } from 'react';
import { Breadcrumb, Spin, Typography, Form, Input, Button, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from '../../htcore';
import apiMethods from '../../api-methods';

const { Title } = Typography;

const CountryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.COUNTRIES(),
            success: (countries) => {
                setCountry(countries.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
    }, []);

    const submit = (values) => {
        const body =  {
            ...country,
            ...values,
        };
        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.COUNTRY(id),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.COUNTRIES(),
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
            komoro_url: apiMethods.COUNTRY(id),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((id !== 'create') && !country) {
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
                        Countries
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{id}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={2}>Country</Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={country}
                onFinish={submit}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input placeholder="Enter Country Name" />
                </Form.Item>
                <Form.Item
                    name="alpha2Code"
                    label="Alpha2 Code"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input placeholder="Enter Alpha2 Code" />
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

export default CountryPage;
