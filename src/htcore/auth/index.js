import { windowLocalStorage } from '../misc/window-local-storage';
import OidcInstance from './oidc-instance';

const STORAGE_KEY = '__auth_id';

const authGetFromStorage = () => windowLocalStorage.get(STORAGE_KEY);

const authRemoveFromStorage = () => windowLocalStorage.remove(STORAGE_KEY);

const authSetToStorage = (auth) => {
    const email = auth?.profile?.email;
    if (!email) {
        if (authGetFromStorage())
            authRemoveFromStorage();
        return;
    }

    const value = window.btoa(email);
    if (value === authGetFromStorage())
        return;

    windowLocalStorage.set(STORAGE_KEY, value);
};

const authorized = () => {
    return authGetFromStorage();
};

export {
    authorized,
    authGetFromStorage,
    authSetToStorage,
    authRemoveFromStorage,
    OidcInstance
}
