import { initOidcInstance } from '../auth/oidc-instance';

const HTCore = {};

const initApplication = ({
    settings,
    getLocale,
    onLogin,
    onLogout,
    showNotification,
    Loader
}) => {
    HTCore.settings = settings;
    HTCore.getLocale = getLocale;
    HTCore.onLogin = onLogin;
    HTCore.onLogout = onLogout;
    HTCore.showNotification = showNotification;
    HTCore.Loader = Loader;

    initOidcInstance(settings);
};

export {
    initApplication,
    HTCore
};
