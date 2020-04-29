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
import { Customer, ICustomer, ReceiptClient } from '../../ApiClient';

export interface IFormValues {
    name?: string
    surname?: string
}

const InnerConsentForm: FunctionComponent = () => {
    const [form] = Form.useForm();

    const submitForm = (name: string, surname: string) => {
        const customer: ICustomer = {
            id: 0,
            customerName: name,
            customerSurname: surname
        };
        new ReceiptClient().addReceipt(customer as Customer);
    }


    const DisplayForms = () => {
        return (
            <div className="kliven-centered">
                <Form layout="inline" onFinish={(values: IFormValues) => submitForm(values.name!, values.surname!)}>
                    <Form.Item
                        name="name"
                        label="Imię"
                        rules={[{
                            required: true,
                            message: "Proszę podać swoje imię.",
                            min: 2,
                            max: 50,
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
                    <Form.Item>
                        <Button defaultChecked={false} size="large" type="primary" htmlType="submit">
                            Dalej
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    return (
        <div>
            {DisplayForms()}
        </div>
    );
}
export default InnerConsentForm;