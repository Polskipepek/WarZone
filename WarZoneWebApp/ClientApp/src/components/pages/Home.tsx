import React, { Component, Props } from 'react';
import { Button, Layout, Menu, Breadcrumb, Form, Input, Icon } from 'antd';
import { RouteComponentProps } from 'react-router';
import WarzoneLayout from '../WarzoneLayout';
import { FormComponentProps } from 'antd/lib/form';

export default Form.create()(class Home extends Component<RouteComponentProps & FormComponentProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            consentCheckbox: false

        }
    }

    render() {
        return this.DisplayPageSelectionButtons();
    }


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

    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    DisplayPageSelectionButtons = () => {
        let butWidth = 300;
        return (
            <div>
                <Button type="primary" size="large" icon="edit" style={
                    {
                        display: "block",
                        width: butWidth,
                        height: 100,
                        position: "relative",
                        left: window.innerWidth / 2 - butWidth / 2,
                        marginTop: "40px",
                        fontSize: 35,
                    }
                }
                    onClick={() => { this.props.history.push("/consent") }}
                >
                    Formularz
                </Button>
                <Button size="large" icon="" style={{
                    display: "block",
                    width: butWidth,
                    height: 100,
                    position: "relative",
                    left: window.innerWidth / 2 - butWidth / 2,
                    marginTop: "20px",
                    fontSize: 35,
                }
                }
                    onClick={() => this.props.history.push("/offerlogin")}
                >
                    Oferta
                </Button>
            </div>
        );
    }
}

);
function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}