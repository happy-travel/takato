import { authGetFromStorage } from '../auth';
import { windowLocalStorage } from './window-local-storage';

const checkWindowSessionAvailability = () => {
    const KEY = 'availability_check';
    const test_result = String(Math.trunc(10000 * Math.random()));
    let result = false;

    try {
        window.sessionStorage.setItem(KEY, test_result);
        if (test_result === window.sessionStorage.getItem(KEY)) {
            result = true;
        }
        window.sessionStorage.removeItem(KEY);
    } catch (e) {
    }
    if (!result) {
        if (window && !window._session) {
            window._session = {};
        }
    }
    return result;
};

export const windowSessionStorage = {
    isAvailable: checkWindowSessionAvailability(),
    set: (key, item) => {
        if (windowSessionStorage.isAvailable) {
            window.sessionStorage.setItem(key, item);
        } else {
            window._session[key] = item;
        }
    },
    get: (key) => {
        if (windowSessionStorage.isAvailable) {
            return window.sessionStorage.getItem(key);
        }
        return window._session[key];
    },
    remove: (key) => {
        if (windowSessionStorage.isAvailable) {
            window.sessionStorage.removeItem(key);
        } else {
            window._session[key] = null;
        }
    }
};

const authKey = (key) => {
    return key + '_' + (authGetFromStorage() || 'unauth');
};

export const localStorage = {
    set: (key, item) => {
        if (!authGetFromStorage()) {
            windowSessionStorage.set(authKey(key), item);
            return;
        }
        windowLocalStorage.set(authKey(key), item);
    },
    get: (key) => {
        if (!authGetFromStorage()) {
            return windowSessionStorage.get(authKey(key));
        }
        return windowLocalStorage.get(authKey(key));
    },
    remove: (key) => {
        if (!authGetFromStorage()) {
            windowSessionStorage.remove(authKey(key));
            return;
        }
        return windowLocalStorage.remove(authKey(key));
    }
};

export const session = {
    set: (key, item) => {
        windowSessionStorage.set(authKey(key), item);
    },
    get: (key) => {
        return windowSessionStorage.get(authKey(key));
    },
    remove: (key) => {
        windowSessionStorage.remove(authKey(key));
    }
};
