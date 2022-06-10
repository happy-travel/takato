import { set, autorun } from 'mobx';
import { session } from './storage';
import { HTCore } from '../base/init-application';

const autoSave = (store, key, shorter) => {
    const settings = HTCore.settings;

    let cached = session.get(key);

    if (cached) {
        try {
            let value = JSON.parse(cached);
            if (value.build === settings.build)
                set(store, value);
        } catch (error) {
            console.error(error);
        }
    }

    let throttle;
    autorun(() => {
        cached = session.get(key);
        const extendedValue = { ...store, build: settings.build };
        const newValue = JSON.stringify(shorter ? shorter(extendedValue) : extendedValue);
        if (cached !== newValue) {
            clearTimeout(throttle);
            throttle = setTimeout(() => {
                session.set(key, newValue);
            }, 350)
        }
    });
};

export default autoSave;
