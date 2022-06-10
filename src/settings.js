const settings = {
    identity_url: process.env.IDENTITY_URL,
    identity_scope: 'openid profile email komoro',
    identity_client_id: 'takato',
    auth_callback_host: window.location.origin,
    edo_url: process.env.EDO_URL,
    edo_v1: '/api/1.0',
    osaka_url: process.env.OSAKA_URL,
    osaka_v1: 'api/1.0',
    komoro_url: process.env.KOMORO_URL,
    komoro_v1: 'api/1.0',
    sentry_dsn: process.env.SENTRY_DSN,
    sentry_environment: process.env.SENTRY_ENVIRONMENT,
    build: process.env.BUILD_VERSION,
    pageTitleSuffix: 'Happytravel.com'
};

settings.edo = (culture) => settings.edo_url + culture + settings.edo_v1;
settings.osaka = () => settings.osaka_url + settings.osaka_v1;
settings.komoro = () => settings.komoro_url + settings.komoro_v1;

export default settings;
