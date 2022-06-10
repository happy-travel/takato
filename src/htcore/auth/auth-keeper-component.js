import { useEffect } from 'react';
import { HTCore } from '../base/init-application';
import { authorized, OidcInstance } from './index';

const AuthDefaultComponent = () => {
    const onLogin = HTCore.onLogin;

    useEffect(() => {
        OidcInstance().getUser().then((auth) => {
            if (auth?.access_token) {
                if (authorized()) {
                    onLogin(auth);
                }
            } else {
                if (authorized()) {
                    OidcInstance().signinSilent().then((authSilent) => {
                        if (authSilent?.access_token) {
                            onLogin(authSilent);
                        }
                    }).catch(() => {
                        OidcInstance().signinRedirect();
                    });
                } else {
                    OidcInstance().signinRedirect();
                }
            }
        });
    }, []);

    return null;
};

export default AuthDefaultComponent;
