import React, { useContext } from 'react';
import {
    Button,
    Form,
    Icon,
    Input
    } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { IAppUser, UsersClient } from '../ApiClient';
import { PersistentStateContext } from '../App';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface ILoginFormProps {
    TryLogin: (username: string, password: string) => void;
}


interface ILoginFormState {
    username: string;
    password: string;
    refresh: boolean;
}

type ILoginFormJoinedProps = ILoginFormProps & FormComponentProps;

class InnerLoginForm extends React.Component<ILoginFormJoinedProps, ILoginFormState> {
    state = {
        username: "",
        password: "",
        refresh: false
    }

    DisplayForms = () => {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const isCorrectName = isFieldTouched('username') && getFieldError('username');
        const isCorrectPassword = isFieldTouched('password') && getFieldError('password');

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={isCorrectName ? 'error' : ''} help={isCorrectName || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input size="large"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={(event) => {
                                this.setState({ username: event.target.value });
                            }}
                        />,
                    )}
                </Form.Item>

                <Form.Item validateStatus={isCorrectPassword ? 'error' : ''} help={isCorrectPassword || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input size="large"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                this.setState({ password: event.target.value });
                            }}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} size="large"
                        onClick={() => {
                            console.log(this.props.TryLogin);
                            this.props.TryLogin(this.state.username, this.state.password);
                        }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form >

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


    render() {
        return (
            <div>
                {this.DisplayForms()}
            </div>
        );
    }


}
const LoginForm = Form.create<ILoginFormJoinedProps>()(InnerLoginForm);
export default LoginForm;
