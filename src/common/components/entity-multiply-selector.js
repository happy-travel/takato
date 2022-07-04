import React from "react";
import {Checkbox, Form} from "antd";

const EntityMultiplySelector = ({ array, name }) => {
    return (
         array.map((el, index) => (
                <Form.Item key={index} name={[name, el]} valuePropName="checked">
                    <Checkbox defaultChecked={false}>{ el }</Checkbox>
                </Form.Item>
         ))
    );
}

export default EntityMultiplySelector;