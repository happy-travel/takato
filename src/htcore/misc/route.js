import React, { useEffect } from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import tracker from './tracker';
import { HTCore } from '../base/init-application';

const Route = (props) => {
    const settings = HTCore.settings;

    useEffect(() => {
        document.title = ( props.title ? (props.title + ' – ') : '' ) + settings.pageTitleSuffix;
        window.scrollTo(0, 0); // todo: do we need it?
        tracker();
    });

    const { title, ...rest } = props;
    return <ReactRoute {...rest} />;
};

export default Route;
