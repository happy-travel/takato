import { windowSessionStorage } from './storage';

const TRACKING_KEY = '_lastVisitedPage';
const AUTH_PATH = '/auth/';
const EXCLUDED_PATHS = [AUTH_PATH, '/signup', '/logout'];
const authRoutes = () => window.location.href.includes(AUTH_PATH);
const routeThatCanBeLastVisited = () => EXCLUDED_PATHS.every((item) => !window.location.href.includes(item));

export const lastPage = () => windowSessionStorage.get(TRACKING_KEY) || '/';

export default () => {
    if (authRoutes()) return;

    windowSessionStorage.set(
        TRACKING_KEY,
        routeThatCanBeLastVisited()
            ? window.location.pathname + window.location.search
            : '/'
    );
};
