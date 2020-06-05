import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { FunctionComponent } from 'react';
import { IService, ServiceClient } from '../../ApiClient';

interface IServiceFinderProps {
    changeCountValue: (newValue: number, service: IService) => void;
}

const ServiceFinder: FunctionComponent<IServiceFinderProps> = (props: IServiceFinderProps) => {
    const [form] = Form.useForm();

    const [waitingTimeout, setWaitingTimeout] = useState<any>();
    const [rawSearchData, setRawSearchData] = useState<IService[] | null>(null);

    const layout = {
        labelCol: {
            span: 48,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const onServiceNameFieldChange = (value: string) => {
        if (value.length < 2)
            return;
        if (isNaN(parseInt(value[0])) == false) {
            const parsedValue = parseInt(value);
            if (isNaN(parsedValue) == false) {
                new ServiceClient().searchServicesById(parsedValue).then((services) => {
                    setRawSearchData(services ? services as unknown as IService[] : null);
                });
            }
        } else {
            if (value.length > 1) {
                new ServiceClient().searchServicesByName(value).then((services) => {
                    setRawSearchData(services ? services as unknown as IService[] : null);
                });
            }
        }
    }

    const searchResults = () => {
        return (
            rawSearchData ? rawSearchData.map(
                searchResult => <Select.Option value={searchResult.serviceName!} key={searchResult.id}>{}</Select.Option>) : undefined
        )
    }

    const onSelect = (serviceName: string, serviceId: number) => {
        if (rawSearchData) {
            const service = rawSearchData.find(service => service.id == serviceId);
            if (service) {
                props.changeCountValue(-2137, service);
            }
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
                setWaitingTimeout(setTimeout(() => onServiceNameFieldChange(changedFields[0].value as string), 200))
            }}
        >
            <Form.Item
                style={{ display: "block" }}
                name="Nazwa usługi"
                label="Nazwa usługi"
                rules={[{
                    required: true,
                    message: "Podaj nazwę lub ID usługi",
                },
                ]}>
                <div style={{ display: "block" }}>
                    <Select
                        showSearch
                        placeholder={"Nazwa usługi"}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        onSelect={(value, option) => onSelect(value as string, option.key as number)}
                    >
                        {searchResults()}
                    </Select>
                </div>
            </Form.Item>
        </Form>
    </>);
}

export default ServiceFinder;