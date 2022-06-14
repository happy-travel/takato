import { useState, useEffect } from 'react';
import { API } from '../../htcore';

const optionsGenerator = (data) => {
    const list = data;

    if (!list?.length)
        return [];

    return list.map((item) => (
        {
            value: item.id,
            label: item.name || item.id
        }
    ));
};

const useSelector = (route) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get({
            komoro_url: route,
            success: (data) => setOptions(optionsGenerator(data)),
            after: () => setLoading(false)
        });
    }, []);

    return {
        loading,
        options
    };
};

export default useSelector;
