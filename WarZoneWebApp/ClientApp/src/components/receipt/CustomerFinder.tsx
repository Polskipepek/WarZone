import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { FunctionComponent } from 'react';
import { ICustomer, CustomerClient, ReceiptAndCustomerBinderClient } from '../../ApiClient';
import FormItemLabel from 'antd/lib/form/FormItemLabel';
import { OptionType } from 'antd/lib/select';

interface ICustomerFinderProps {
    editMode: boolean;
    customers: ICustomer[];
    setCustomers: any;
}

const CustomerFinder: FunctionComponent<ICustomerFinderProps> = (props: ICustomerFinderProps) => {
    const [form] = Form.useForm();

    const [waitingTimeout, setWaitingTimeout] = useState<any>();
    const [rawSearchData, setRawSearchData] = useState<ICustomer[] | null>(null);

    const layout = {
        labelCol: {
            span: 48,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const onCustomerNameFieldChange = (value: string) => {
        if (value.length < 2)
            return;

        // szukamy po nazwie
        console.log("szukam po nazwie")
        new ReceiptAndCustomerBinderClient().getAvailableCustomers(value).then((customers) => {
            setRawSearchData(customers ? customers as ICustomer[] : null);
        });
    }
    const searchResults = () => {
        return rawSearchData ? rawSearchData.map(
            searchResult => <Select.Option value={`${searchResult.customerName!} ${searchResult.customerSurname!}`} key={searchResult.id}>{`${searchResult.customerName!} ${searchResult.customerSurname!}`}</Select.Option>) : undefined;
    }

    const onSelect = (customerId: number) => {
        console.log(customerId);
        if (rawSearchData) {
            const customer = rawSearchData.find(customer => customer.id == customerId);
            if (customer) {
                props.setCustomers([...props.customers, customer]);
            }
        }
    }
    const onDeselect = (customerName: string) => {
        console.log(customerName);
        const customer = props.customers.find(customer => `${customer.customerName} ${customer.customerSurname}` == customerName);
        console.log(customer);
        if (customer) {
            var filtered = props.customers.filter((value) => { return value != customer })
            console.log(filtered);
            props.setCustomers(filtered);
        }

    }


    return (<>
        <Form
            {...layout}
            form={form}
            onFieldsChange={(changedFields, allFields) => {
                if (waitingTimeout) {
                    clearTimeout(waitingTimeout);
                }
                setWaitingTimeout(setTimeout(() => onCustomerNameFieldChange(changedFields[0].value as string), 200))
            }}
        >
            <Form.Item
                style={{ display: "block" }}
                name="Klienci"
                rules={[{
                    required: true,
                    message: "Podaj imię lub nazwisko",
                },
                ]}>
                <div style={{ display: "block" }}>
                    <Select
                        mode={"multiple"}
                        showSearch
                        placeholder={"Klienci"}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        disabled={!props.editMode}
                        onSelect={(value, option) => onSelect(option.key as number)}
                        onDeselect={(value, option) => { onDeselect(value) }}
                        value={props.customers.map((cus) => (`${cus.customerName!} ${cus.customerSurname!}`))}
                    >
                        {searchResults()}
                    </Select>

                </div>

            </Form.Item>
        </Form>
    </>);
}

export default CustomerFinder;