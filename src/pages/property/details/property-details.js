import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { API } from '../../../htcore';
import apiMethods from '../../../api-methods';

const PropertyDetails = ({ property }) => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const submit = (values) => {
        const body =  {
            ...property,
            ...values,
        };
        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.PROPERTY(propertyId),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.PROPERTIES(),
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
            komoro_url: apiMethods.PROPERTY(propertyId),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((propertyId !== 'create') && !property) {
        return <Spin />;
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                initialValues={property}
                onFinish={submit}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input placeholder="Enter Property Name" />
                </Form.Item>
                <pre>{JSON.stringify(property, 1, 2)}</pre>
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
            { (propertyId !== 'create') &&
                <div className="remove-holder">
                    <Button onClick={remove}>
                        Remove
                    </Button>
                </div>
            }
        </>
    );
};

export default PropertyDetails;
