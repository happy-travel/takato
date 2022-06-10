import { UserManager } from 'oidc-client';

let OidcInstance = null;

export const initOidcInstance = (settings) => {
    const host = settings.auth_callback_host;
    const config = {
        authority: settings.identity_url,
        client_id: settings.identity_client_id,
        scope: settings.identity_scope,
        post_logout_redirect_uri: host,
        redirect_uri: host + '/auth/callback',
        silent_redirect_uri: host + '/auth/silent',
        response_type: 'code',
        automaticSilentRenew: true,
        loadUserInfo: true,
        filterProtocolClaims: true,
        accessTokenExpiringNotificationTime: 4
    };
    OidcInstance = new UserManager(config);
};

export default () => OidcInstance;
