import React, {useEffect, useState} from "react";
import {Checkbox, Form} from "antd";
import {API} from "../../htcore";

const EntityMultiplySelector = ({ method, name }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        API.get({
            komoro_url: method(),
            success: (result) => {
                setData(result);
            }
        })
    }, []);

    return (
         data && (
             data.map((el, index) => (
                 <Form.Item key={index} name={[name, el]} valuePropName="checked">
                     <Checkbox defaultChecked={false}>{ el }</Checkbox>
                 </Form.Item>
             ))
         )
    );
}

export default EntityMultiplySelector;