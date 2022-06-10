import { useEffect } from 'react';
import OidcInstance from '../oidc-instance';

const AuthSilentCallbackComponent = () => {
    useEffect(() => {
        OidcInstance().signinSilentCallback().catch((error) => {
            console.error('Silent auth failed: ' + error);
        });
    }, []);

    return null;
};

export default AuthSilentCallbackComponent;
