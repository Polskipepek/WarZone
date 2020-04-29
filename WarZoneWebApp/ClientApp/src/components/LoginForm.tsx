import Icon from '@ant-design/icons/lib/components/Icon';
import React, { FunctionComponent, useContext } from 'react';
import { Store } from 'antd/lib/form/interface';
import {
    Button,
    Form,
    Input,
} from 'antd';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface ILoginFormProps {
    TryLogin: (username: string, password: string) => void;
}

export interface ILoginFormValues {
    username?: string;
    password?: string;
}

type ILoginFormJoinedProps = ILoginFormProps;

const LoginForm: FunctionComponent<ILoginFormJoinedProps> = (props: ILoginFormJoinedProps) => {
    const [form] = Form.useForm();

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const DisplayForms = () => {
        const { getFieldsError, getFieldError, isFieldTouched } = form;
        const isCorrectName = isFieldTouched('username') && getFieldError('username');
        const isCorrectPassword = isFieldTouched('password') && getFieldError('password');

        return (
            <div>
                <Form layout="inline" validateMessages={validateMessages} onFinish={(values: ILoginFormValues) => {
                    props.TryLogin(values.username!, values.password!);
                }}>
                    <Form.Item
                        name="username"
                        validateStatus={isCorrectName ? 'error' : ''}
                        help={isCorrectName || ''}
                        rules={[{
                            required: true,
                            type: "string",
                            message: validateMessages.required
                        }]}>
                        <Input
                            size="large"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="Login"
                        /* onChange={(event) => {
                            form.setFieldsValue({ password: event.target.value });
                        }} */
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={isCorrectPassword ? 'error' : ''}
                        help={isCorrectPassword || ''}
                        rules={[{
                            required: true,
                            message: validateMessages.required
                        }]}>
                        <Input size="large"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Hasło"
                        /* onChange={(event) => {
                            form.setFieldsValue({ password: event.target.value });
                        }} */
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} size="large">
                            Log in
                    </Button>
                    </Form.Item>
                </Form >
            </div>
        );
    }

    return (
        <div>
            {DisplayForms()}
        </div>
    );
}



export default LoginForm;
