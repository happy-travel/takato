import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { GlobalOutlined, HomeOutlined, BorderOutlined, AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const items = [
    { label: <Link to="/">Index</Link>, key: 'index', icon: <HomeOutlined /> },
    { label: <Link to="/property">Properties</Link>, key: 'property', icon: <AppstoreOutlined /> },
    { label: <Link to="/country">Countries</Link>, key: 'country', icon: <GlobalOutlined /> },
    { label: <Link to="/room-type">Room Types</Link>, key: 'room-type', icon: <BorderOutlined /> },
    { label: <Link to="/meal-plan">Meal Plans</Link>, key: 'meal-plan', icon: <PieChartOutlined /> },
];

const SideMenu = () => (
    <Sider>
        <div className="logo-wrapper">
            <img src="/images/logo/logo.png" alt="Happytravel.com" />
        </div>
        <Menu items={items} />
    </Sider>
);

export default SideMenu;
