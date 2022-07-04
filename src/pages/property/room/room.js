import React, { useState, useEffect } from 'react';
import {Button, Form, Input, InputNumber, message, Spin, Space, Card, Checkbox, Typography, Col} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../htcore';
import apiMethods from '../../../api-methods';
import RoomTypeSelector from '../../../common/components/room-type-selector';
import MealPlanSelector from '../../../common/components/meal-plan-selector';
import EntityMultiplySelector from "../../../common/components/entity-multiply-selector";

const { Text } = Typography;

const RoomPage = () => {
    const {propertyId, id} = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [room, setRoom] = useState(null);
    const [ratePlans, setRatePlans] = useState([]);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.ROOMS(propertyId),
            success: (rooms) => {
                setRoom(rooms.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
        API.get({
            komoro_url: apiMethods.RATE_PLANS(),
            success: (data) => {
                setRatePlans(data.filter((el) => el !== "None"));
            }
        })
    }, []);

    const submit = (values) => {
        const ratePlans = Object.keys(values.ratePlans)
            .filter((value) => values.ratePlans[value] === true)
            .join(", ")

        const body =  {
            ...room,
            ...values,
            ratePlans,
        };

        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.ROOM(propertyId, id),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.ROOMS(propertyId),
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
            komoro_url: apiMethods.ROOM(propertyId, id),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((id !== 'create') && !room) {
        return <Spin />;
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                initialValues={room}
                onFinish={submit}
            >
                <Form.Item
                    name={['roomType', 'id']}
                    label="Room Type"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <RoomTypeSelector />
                </Form.Item>
                <Form.Item
                    name={['standardMealPlan', 'id']}
                    label="Standard Meal Plan"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <MealPlanSelector />
                </Form.Item>
                <Input.Group compact>
                    <Form.Item name={['standardOccupancy', 'adults']} label="Standard Occupancy Adults" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="2" />
                    </Form.Item>
                    <Form.Item name={['standardOccupancy', 'children']} label="Standard Occupancy Children">
                        <InputNumber placeholder="0" />
                    </Form.Item>
                </Input.Group>
                <Card title="Maximum Occupancy" style={{ maxWidth: 350, marginBottom: 30 }}>
                    <Form.List name="maximumOccupancy">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            name={[name, 'adults']}
                                            label="Adults"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Required',
                                                },
                                            ]}
                                        >
                                            <InputNumber placeholder="2" />
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'children']}
                                            label="Children"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Required',
                                                },
                                            ]}
                                        >
                                            <InputNumber placeholder="0" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ position: 'relative', top: 35, marginLeft: 10 }}/>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Occupancy
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>
                <Input.Group compact>
                    <Form.Item name={['extraAdultSupplement', 'amount']} label="Extra Adult Supplement Amount" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="2" />
                    </Form.Item>
                    <Form.Item name={['extraAdultSupplement', 'currency']} label="Extra Adult Supplement Currency">
                        <Input placeholder="USD" />
                    </Form.Item>
                </Input.Group>
                <Input.Group compact>
                    <Form.Item name={['childSupplement', 'amount']} label="Child Supplement Amount" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="2" />
                    </Form.Item>
                    <Form.Item name={['childSupplement', 'currency']} label="Child Supplement Currency">
                        <Input placeholder="USD" />
                    </Form.Item>
                </Input.Group>
                <Input.Group compact>
                    <Form.Item name={['infantSupplement', 'amount']} label="Infant Supplement Amount" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="2" />
                    </Form.Item>
                    <Form.Item name={['infantSupplement', 'currency']} label="Infant Supplement Currency">
                        <Input placeholder="USD" />
                    </Form.Item>
                </Input.Group>
                <Col span={11}>
                    <Space direction="vertical" size="middle">
                        <Text>Rate Plans</Text>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                            <EntityMultiplySelector array={ratePlans} name="ratePlans" />
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
        </>
    );
};

export default RoomPage;
