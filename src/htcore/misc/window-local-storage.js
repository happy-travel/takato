const checkWindowLocalStorageAvailability = () => {
    const KEY = 'availability_check';
    const test_result = String(Math.trunc(10000 * Math.random()));
    let result = false;

    try {
        window.localStorage.setItem(KEY, test_result);
        if (test_result === window.localStorage.getItem(KEY)) {
            result = true;
        }
        window.localStorage.removeItem(KEY);
    } catch (e) {
    }
    if (!result) {
        if (window && !window._localStorage) {
            window._localStorage = {};
        }
    }
    return result;
};

let wlsAvailable = checkWindowLocalStorageAvailability();

export const windowLocalStorage = {
    set: (key, item) => {
        try {
            if (wlsAvailable) {
                window.localStorage.setItem(key, item);
            } else {
                window._localStorage[key] = item;
            }
        } catch (e) {
        }
    },
    get: (key) => {
        let result = null;
        try {
            if (wlsAvailable) {
                result = window.localStorage.getItem(key);
            } else {
                result = window._localStorage[key];
            }
        } catch (e) {
        }
        return result;
    },
    remove: (key) => {
        try {
            if (wlsAvailable) {
                window.localStorage.removeItem(key);
            } else {
                window._localStorage[key] = null;
            }
        } catch (e) {
        }
    },
};
