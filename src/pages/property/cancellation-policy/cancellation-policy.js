import React, { useState, useEffect } from 'react';
import {Button, Form, Input, message, Spin, DatePicker} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import apiMethods from '../../../api-methods';
import {API} from '../../../htcore';

const CancellationPolicyPage = () => {
    const {propertyId, id} = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [cancellationPolicy, setCancellationPolicy] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.CANCELLATION_POLICIES(propertyId),
            success: (cancellationPolicies) => {
                let result = cancellationPolicies.find(
                    (item) => String(item.id) === String(id)
                );
                result.fromDate = moment(result.fromDate);
                result.toDate = moment(result.toDate);
                setCancellationPolicy(result);
            }
        });
    }, []);

    const submit = (values) => {
        const body =  {
            ...cancellationPolicy,
            ...values,
            fromDate: values.fromDate.format('YYYY-MM-DD'),
            toDate: values.toDate.format('YYYY-MM-DD'),
        };
        if (id !== 'create')  {
            API.put({
                komoro_url: apiMethods.CANCELLATION_POLICY(propertyId, id),
                body,
                success: () => {
                    message.success('Saved');
                    navigate('./..');
                }
            });
        } else {
            API.post({
                komoro_url: apiMethods.CANCELLATION_POLICIES(propertyId),
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
            komoro_url: apiMethods.CANCELLATION_POLICY(propertyId, id),
            success: () => {
                message.success('Removed');
                navigate('./..');
            }
        });
    };

    if ((id !== 'create') && !cancellationPolicy) {
        return <Spin />;
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                initialValues={cancellationPolicy}
                onFinish={submit}
            >
                <Form.Item name="fromDate" label="From Date">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="toDate" label="To Date">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="seasonalityOrEvent" label="Seasonality Or Event">
                    <Input placeholder="Seasonality Or Event" />
                </Form.Item>
                <Form.Item name="deadline" label="Deadline">
                    <Input placeholder="0" />
                </Form.Item>
                <Form.Item name="percentage" label="Percentage">
                    <Input placeholder="0" />
                </Form.Item>
                <Form.Item name="noShow" label="No Show">
                    <Input placeholder="0" />
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
        </>
    );
};

export default CancellationPolicyPage;
