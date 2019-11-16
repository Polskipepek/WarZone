import React, { Component } from 'react';
import { Button, Form, Input, Icon } from 'antd';
import Home from './Home';
import { homedir } from 'os';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface InnerOfferProps {

}

export class InnerOffer extends Component<InnerOfferProps & RouteComponentProps & FormComponentProps> {
    render() {
        return (
            <div>
                {this.DisplayForms()}



            </div>
        );
    }

    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    DisplayForms() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const surname = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={surname ? 'error' : ''} help={surname || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }


}
const Offer = Form.create()(InnerOffer);
export default Offer;