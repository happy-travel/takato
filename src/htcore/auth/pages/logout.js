import React, { useEffect } from 'react';
import { HTCore } from '../../base/init-application';
import OidcInstance from '../oidc-instance';
import { authRemoveFromStorage } from '../index';

const AuthLogoutComponent = () => {
    const Loader = HTCore.Loader;
    const onLogout = HTCore.onLogout;

    useEffect(() => {
        authRemoveFromStorage();
        OidcInstance().signoutRedirect();
        onLogout();
    }, []);

    return <Loader />;
};

export default AuthLogoutComponent;
