import { HTCore } from '../base/init-application';
import OidcInstance from '../auth/oidc-instance';

export default (() => {
    const api = {};
    api.request = (requestParams) => {
        const {
            url,
            osaka_url,
            unauth_edo_url,
            komoro_url,
            body = {}, 
            formDataBody,
            method = 'GET',
            response,   // function(response)                - Fires first
            success,    // function(result)                  - Fires second on success
            error,      // function(error)                   - Fires second on error,
            after,      // function(result, error, response) - Fires the last
            ignoreErrors
        } = requestParams;

        const getLocale = HTCore.getLocale;
        const settings = HTCore.settings;
        const showNotification = HTCore.showNotification;

        const getEdoRoute = (route) => route ? (settings.edo(getLocale()) + route) : null;
        const getOsakaRoute = (route) => route ? (settings.osaka(getLocale()) + route) : null;
        const getKomoroRoute = (route) => route ? (settings.komoro(getLocale()) + route) : null;

        const showError = (err, url = '', requestParams) => {
            if (requestParams.ignoreErrors)
                return;
            if (typeof err.detail == 'string')
                return showNotification(err.detail);
            if (typeof err.title == 'string')
                return showNotification(err.title, 'Error');
            if (typeof err == 'string')
                return showNotification(err, 'Information');
            showNotification('Server Request Error');
        };

        return new Promise((resolve, reject) => {
            OidcInstance().getUser().then((auth) => {
                if (!unauth_edo_url && !auth?.access_token) {
                    return;
                }

                let finalUrl = (
                    getEdoRoute(url) ||
                    getOsakaRoute(osaka_url) ||
                    getKomoroRoute(komoro_url) ||
                    getEdoRoute(unauth_edo_url)
                );
                let request = {
                        method: method,
                        headers: new Headers({
                            ...(unauth_edo_url ? {} : {
                                'Authorization': `Bearer ${auth.access_token}`
                            }),
                            ...(formDataBody ? {} : {
                                'Content-Type': 'application/json'
                            })
                        })
                    };

                if (['POST', 'PUT', 'DELETE'].includes(method))
                    request.body = JSON.stringify(body);
                else {
                    let getBody = Object.keys(body).map(key =>
                        Array.isArray(body[key]) ?
                            body[key].map(item => [key, item].map(encodeURIComponent).join('=')) :
                            [key, body[key]].map(encodeURIComponent).join('=')
                    ).flat().join('&');
                    finalUrl += (getBody ? '?' + getBody : '');
                }

                if (formDataBody)
                    request.body = formDataBody;

                let rawResponse = null,
                    failed = false;

                fetch(finalUrl, request)
                    .then(
                        (res) => {
                            rawResponse = res;
                            failed = !res || (res && res.status >= 300);
                            if (response) {
                                response(res);
                                return;
                            }
                            return res.text().then((text) => {
                                let value = null;
                                if (text) {
                                    try {
                                        value = JSON.parse(text);
                                    } catch (e) {
                                        value = text;
                                    }
                                }
                                return value;
                            });
                        },
                        (error) => {
                            showError(error, url, requestParams);
                            reject(error);
                        }
                    )
                    .then(
                        (result) => {
                            if (!rawResponse?.status) {
                                reject(null);
                                return;
                            }
                            if (rawResponse.status === 401) {
                                OidcInstance().signinSilent().then(() => {
                                    api.request(requestParams);
                                }).catch(() => {
                                    OidcInstance().signinRedirect();
                                });
                                reject(null);
                                return;
                            }
                            if (rawResponse.status === 403) {
                                showError('Sorry, you don`t have enough permissions', url, requestParams);
                                if (error) {
                                    error(result);
                                }
                                if (after) {
                                    after(null, null, rawResponse);
                                }
                                reject(result);
                                return;
                            }
                            if (failed) {
                                if (result && result.status >= 400) {
                                    showError(result, url, requestParams);
                                }
                                if (error) {
                                    error(result);
                                }
                            } else {
                                if (success) {
                                    success(result);
                                }
                            }
                            if (after)
                                after(
                                    failed ? null : result,
                                    failed ? result : null,
                                    rawResponse
                                );
                            if (!failed) {
                                resolve(result);
                            }  else {
                                reject(result);
                            }
                        },
                        (err) => {
                            if (error) {
                                error(err);
                            } else {
                                showError(err, null, requestParams);
                            }
                            if (after) {
                                after(null, err, rawResponse);
                            }
                            reject(err);
                        }
                    );
                }
            );
        });
    };

    api.get = (params) =>
        api.request({
            method: 'GET',
            ...params
        });

    api.post = (params) =>
        api.request({
            method: 'POST',
            ...params
        });

    api.put = (params) =>
        api.request({
            method: 'PUT',
            ...params
        });

    api.delete = (params) =>
        api.request({
            method: 'DELETE',
            ...params
        });

    return api;
})();
