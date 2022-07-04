import React from 'react';
import {Button, message} from 'antd';
import { API } from '../../../htcore';
import apiMethods from '../../../api-methods';

const PingPagePart = () => {
    const pingRequest = () => {
        API.post({
            komoro_url: apiMethods.PING(),
            success: () => {
                message.success("Success");
            },
        });
    };

    return (
        <Button type="primary" onClick={pingRequest}>
            Ping Travel Click
        </Button>
    );
};

export default PingPagePart;
