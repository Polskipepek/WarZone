import React, { Component } from 'react';
import { Button, Form, Input, Icon } from 'antd';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class InnerOffer extends Component<any> {
    render() {
        return (
            <div>

            </div>
        );
    }





}
const Offer = Form.create()(InnerOffer);
export default Offer;