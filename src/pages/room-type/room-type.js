import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Form, Input, message, Spin, Typography, InputNumber } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from '../../htcore';
import apiMethods from '../../api-methods';

const { Title } = Typography;

const RoomTypePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [roomType, setRoomType] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOM_TYPES(),
            success: (roomTypes) => {
                setRoomType(roomTypes.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
    }, []);

    const submit = (values) => {
        const body =  {
            ...roomType,
            ...values,
        };
        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.ROOM_TYPE(id),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.ROOM_TYPES(),
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
            komoro_url: apiMethods.ROOM_TYPE(id),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((id !== 'create') && !roomType) {
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
                        Room Types
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{id}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={2}>Room Type</Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={roomType}
                onFinish={submit}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input placeholder="Enter Room Type Name" />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                >
                    <Input placeholder="Enter Room Type Code" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                >
                    <InputNumber placeholder="Enter Room Type Category" />
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

export default RoomTypePage;
