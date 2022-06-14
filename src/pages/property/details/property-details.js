import React from 'react';
import { Button, Form, Input, message, Spin, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CountrySelector from '../../../common/components/country-selector';
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
        if (propertyId !== 'create')  {
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
                <Input.Group compact>
                    <Form.Item label="Supplier" name="supplierCode" rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                        <Input placeholder="Supplier" />
                    </Form.Item>
                    <Form.Item label="Code" name="code" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="Supplier Code"  />
                    </Form.Item>
                </Input.Group>
                <Input.Group compact>
                    <Form.Item label="Country" name={['address', 'country', 'id']} style={{ minWidth: '180px', marginRight: '20px' }} rules={[{ required: true, message: 'Required' }]}>
                        <CountrySelector />
                    </Form.Item>
                    <Form.Item label="City" name={['address', 'city']} rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                        <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item label="Street" name={['address', 'street']} rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                        <Input placeholder="Street" />
                    </Form.Item>
                    <Form.Item label="Postal" name={['address', 'postalCode']} rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="Postal Code" />
                    </Form.Item>
                </Input.Group>
                <Form.Item label="Coordinates" style={{ marginBottom: 0 }} >
                    <Input.Group compact>
                        <Form.Item name={['coordinates', 'longitude']} rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                            <Input placeholder="Longitude" />
                        </Form.Item>
                        <Form.Item name={['coordinates', 'latitude']} rules={[{ required: true, message: 'Required' }]}>
                            <Input placeholder="Latitude" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Input.Group compact>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                        <Input placeholder="Enter Property Contact Phone" />
                    </Form.Item>
                    <Form.Item name="starRating" label="Star Rating">
                        <InputNumber placeholder="Enter Star Rating" />
                    </Form.Item>
                </Input.Group>
                <Input.Group compact>
                    <Form.Item name="checkInTime" label="Check In Time" rules={[{ required: true, message: 'Required' }]} style={{ marginRight: '20px' }}>
                        <Input placeholder="19:00:00" />
                    </Form.Item>
                    <Form.Item name="checkOutTime" label="Check Out Time" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="19:00:00" />
                    </Form.Item>
                </Input.Group>
                <Input.Group compact>
                    <Form.Item name={['passengerAge', 'infantFrom']} label="Infant Age" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="0" />
                    </Form.Item>
                    <Form.Item name={['passengerAge', 'childFrom']} label="Child Age" style={{ marginRight: '20px' }}>
                        <InputNumber placeholder="4" />
                    </Form.Item>
                    <Form.Item name={['passengerAge', 'adultFrom']} label="Adult Age">
                        <InputNumber placeholder="12" />
                    </Form.Item>
                </Input.Group>
                <Form.Item name="reservationEmail" label="Reservation Email" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="Enter Reservation Email" />
                </Form.Item>
                <Input.Group compact>
                    <Form.Item name={['primaryContact', 'name']} label="Contact Name" style={{ marginRight: '20px' }}>
                        <Input placeholder="Contact Name" />
                    </Form.Item>
                    <Form.Item name={['primaryContact', 'title']} label="Title" style={{ marginRight: '20px' }}>
                        <Input placeholder="Contact Title" />
                    </Form.Item>
                    <Form.Item name={['primaryContact', 'email']} label="Email" style={{ marginRight: '20px' }}>
                        <Input placeholder="Contact Email" />
                    </Form.Item>
                    <Form.Item name={['primaryContact', 'phone']} label="Phone" style={{ marginRight: '20px' }}>
                        <Input placeholder="Contact Phone" />
                    </Form.Item>
                    <Form.Item name={['primaryContact', 'description']} label="Description">
                        <Input placeholder="Contact Description" />
                    </Form.Item>
                </Input.Group>
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
