import { useEffect } from 'react';
import OidcInstance from '../oidc-instance';
import { authSetToStorage } from '../index';
import { useNavigate } from "react-router-dom";
import { lastPage } from '../../misc/tracker';

const AuthCallbackComponent = () => {
    const navigate = useNavigate();

    const onRedirectSuccess = (auth) => {
        OidcInstance().clearStaleState();
        authSetToStorage(auth);
        navigate(lastPage());
    };

    const onRedirectError = () => {
        navigate(lastPage());
    };

    useEffect(() => {
        OidcInstance().signinRedirectCallback()
            .then(onRedirectSuccess)
            .catch(onRedirectError);
    }, []);

    return null;
};

export default AuthCallbackComponent;
