import React, {
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
} from 'antd';

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

    const DisplayForms = () => {
        const [, forceUpdate] = useState();

        useEffect(() => {
            forceUpdate({});
        }, []);

        return (
            <Form
                form={form}
                name="horizontal_login"
                layout="inline"
                onFinish={(values: ILoginFormValues) => {
                    props.TryLogin(values.username!, values.password!);
                }}>
                <Form.Item
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Please input your username!'
                    }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Login" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your password!'
                    }]}>
                    <Input
                        size="large"
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                            }
                        >
                            Zaloguj
                        </Button>)}
                </Form.Item>
            </Form>
        );
    }

    return (
        <div>
            {DisplayForms()}
        </div>
    );
}

export default LoginForm;
