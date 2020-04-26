import React, { Component, FunctionComponent } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input
    } from 'antd';
import {
    ConsentClient,
    Customer,
    ICustomer,
    ReceiptClient
    } from '../../ApiClient';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const InnerConsentForm: FunctionComponent = () => {
    const [form] = Form.useForm();

    formValues: any;
    constructor(props: any) {
        super(props);

        constformValues = {
            Imię: "",
            Nazwisko: ""
        };
    }

    const submitForm = () => {
        if (form.field.Imię != "" && this.formValues.Nazwisko != "") {
            const customer: ICustomer = {
                id: 0,
                customerName: this.formValues.Imię,
                customerSurname: this.formValues.Nazwisko
            };

            new ConsentClient().addCustomer(customer as Customer);
            new ReceiptClient().addReceipt(customer as Customer);
        }
    }




    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    const DisplayForms = () => {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // const surname = isFieldTouched("surname") && getFieldError("surname");
        return (
            <div className="kliven-centered">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {this.DisplayInputField("Imię", "", "Imię", "edit", "Podaj swoje imię", () => !(!isFieldTouched("Imię") || isFieldTouched && getFieldError("Imię")))}
                    {this.DisplayInputField("Nazwisko", "", "Nazwisko", "edit", "Podaj swoje nazwisko", () => !(!isFieldTouched("Nazwisko") || isFieldTouched && getFieldError("Nazwisko")))}

                    <Form.Item>
                        <Button onClick={() => this.submitForm()} defaultChecked={false} size="large" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Dalej
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    const DisplayInputField = (fieldName: string, fieldType: string, placeholder: string, iconType: string, errorMessage: string, validator: () => boolean) => {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form.Item validateStatus={validator() ? "" : 'error'} help={""}>
                {getFieldDecorator(fieldName, {
                    rules: [{ required: true, message: { errorMessage } }],
                })(
                    <Input size="large"
                        prefix={<Icon type={iconType} style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type={fieldType}
                        placeholder={placeholder}
                        onChange={(value) => this.formValues[fieldName] = value.target.value}
                    />,
                )}
            </Form.Item>
        );
    }

    return (
        <div>
            {this.DisplayForms()}
        </div>
    );
}
export default ConsentForm;