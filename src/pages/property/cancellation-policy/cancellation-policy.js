import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useParams } from "react-router-dom";
import apiMethods from '../../../api-methods';
import {API} from '../../../htcore';

const CancellationPolicyPage = () => {
    const {propertyId, id} = useParams();

    const [cancellationPolicy, setCancellationPolicy] = useState(null);

    useEffect(() => {
        API.get({
            komoro_url: apiMethods.CANCELLATION_POLICIES(propertyId),
            success: (cancellationPolicies) => {
                setCancellationPolicy(cancellationPolicies.find(
                    (item) => String(item.id) === String(id)
                ));
            }
        });
    }, []);

    if (!cancellationPolicy)
        return <Spin />;

    return (
        <>
            <div>In progress.</div>
            <pre>{JSON.stringify(cancellationPolicy,1,2)}</pre>
        </>
    );
};

export default CancellationPolicyPage;
