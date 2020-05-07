import Icon from '@ant-design/icons/lib/components/Icon';
import React, {
    Component,
    FunctionComponent,
    useEffect,
    useState
    } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input
    } from 'antd';
import {
    Customer,
    ICustomer,
    IReceipt,
    ReceiptClient
    } from '../../ApiClient';

export interface IFormValues {
    name?: string
    surname?: string
}
interface IInnerConsentForm {
    setVisible?: any;
    pullReceipts?: () => void;
    visible?: boolean;
}

const InnerConsentForm: FunctionComponent<IInnerConsentForm> = (props) => {
    const [form] = Form.useForm();

    const submitForm = (name: string, surname: string) => {
        const customer: ICustomer = {
            id: 0,
            customerName: name,
            customerSurname: surname
        };
        new ReceiptClient().addReceipt(customer as Customer);
        props.setVisible();
        if (props.pullReceipts) {
            setTimeout(() => props.pullReceipts!(), 500);
        }
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const DisplayForms = () => {
        const [, forceUpdate] = useState();

        useEffect(() => {
            forceUpdate({});
        }, []);

        useEffect(() => form.resetFields(), [props.visible]);

        return (
            <div className="kliven-centered">
                <Form
                    {...layout}
                    onFinish={(values: IFormValues) => {
                        submitForm(values.name!, values.surname!);
                    }}
                    form={form}
                >
                    <Form.Item
                        name="name"
                        label="Imię"
                        rules={[{
                            required: true,
                            message: "Proszę podać swoje imię.",
                        },
                        {
                            min: 2,
                            max: 50,
                            message: "Nieprawidłowa długość"
                        }]}>
                        <Input
                            size="large"
                            type="text"
                            placeholder={"Imię"}
                        />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Nazwisko"
                        rules={[{
                            required: true,
                            message: "Proszę podać swoje nazwisko.",
                            min: 2,
                            max: 100
                        }]}>
                        <Input
                            size="large"
                            type="text"
                            placeholder={"Nazwisko"}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout} shouldUpdate={true}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            Dalej
                            </Button>

                    </Form.Item>
                </Form>
            </div>
        );
    }

    return (<>
        {DisplayForms()}
    </>);
}
export default InnerConsentForm;