import React, { useState, useEffect } from 'react';
import { Breadcrumb, Typography, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useParams, Routes, Route } from "react-router-dom";
import { API } from '../../htcore';
import apiMethods from '../../api-methods';
import PropertyDetails from './details/property-details';
import CancellationPolicies from './cancellation-policy/cancellation-policies';
import CancellationPolicy from './cancellation-policy/cancellation-policy';
import Rooms from './room/rooms';
import Room from './room/room';

const { Title } = Typography;

const items = [
    { label: <Link to="./">Details</Link>, key: 'index' },
    { label: <Link to="./room">Rooms</Link>, key: 'rooms' },
    { label: <Link to="./cancellation-policy">Cancellation Policies</Link>, key: 'cancellation' },
];

const PropertyPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.PROPERTY(propertyId),
            success: setProperty
        });
    }, []);

    return (
        <>
            <div className="page-content">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="./..">
                            Properties
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{propertyId}</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={2}>Property</Title>
            </div>
            <Menu mode="horizontal" items={items} defaultSelectedKeys={['index']} />
            <div className="page-content">
                <Routes>
                    <Route path='/' element={ <PropertyDetails property={property} /> } />
                    <Route path='/cancellation-policy' element={ <CancellationPolicies /> } />
                    <Route path='/cancellation-policy/:id' element={ <CancellationPolicy /> } />
                    <Route path='/room' element={ <Rooms /> } />
                    <Route path='/room/:id' element={ <Room /> } />
                </Routes>
            </div>
        </>
    );
};

export default PropertyPage;
