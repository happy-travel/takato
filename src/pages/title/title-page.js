import React from 'react';
import { Typography } from 'antd';
import PingPagePart from './ping/ping';

const { Title } = Typography;

const TitlePage = () => (
    <div className="page-content">
        <Title level={2}>Welcome!</Title>
        <p>
            We glad to see you in Takato – Komoro mini PMS API<br />
            Please note, that this panel is currently in development
        </p>
        <div style={{ marginTop: '70px' }}>
            <Title level={4}>Useful Tools</Title>
            <PingPagePart />
        </div>
    </div>
);

export default TitlePage;
