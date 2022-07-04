import React, { useState, useEffect } from 'react';
import {Breadcrumb, Button, Form, Input, message, Spin, Typography, Space, Checkbox, Col} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../htcore';
import apiMethods from '../../api-methods';
import EntityMultiplySelector from "../../common/components/entity-multiply-selector";

const { Title, Text } = Typography;

const RoomTypePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [roomType, setRoomType] = useState(null);
    const [roomCategories, setRoomCategories] = useState([]);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOM_TYPES(),
            success: (roomTypes) => {
                setRoomType(roomTypes.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
        API.get({
            komoro_url: apiMethods.ROOM_CATEGORIES(),
            success: (data) => {
                setRoomCategories(data);
            }
        })
    }, []);

    const submit = (values) => {
        const category = Object.keys(values.category)
            .filter((value) => values.category[value] === true)
            .join(", ")

        const body =  {
            ...roomType,
            ...values,
            category,
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
                <Col span={11}>
                    <Space direction="vertical" size="middle">
                        <Text>Category</Text>
                        <div style={{display: "flex", columnGap: "10px"}}>
                            <EntityMultiplySelector array={roomCategories} name="category" />
                        </div>
                    </Space>
                </Col>
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
