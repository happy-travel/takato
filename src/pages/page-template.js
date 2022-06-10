import React from 'react';
import { authorized, HTCore } from '../htcore';
import { Layout } from 'antd';
import SideMenu from '../layout/menu';
import RoutesPage from './routes';

const { Content } = Layout;

const PageTemplate = () => {
    const Loader = HTCore.Loader;
    const canShowContent = authorized();

    if (!canShowContent) {
        return <Loader />;
    }

    return (
        <Layout>
            <SideMenu />
            <Content>
                <RoutesPage />
            </Content>
        </Layout>
    );
};

export default PageTemplate;
