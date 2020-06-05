import ConsentContent from '../pages/Consent';
import ConsentContentModal from './ConsentContent';
import GdprContent from './GdprContent';
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
import { Link } from 'react-router-dom';
import { openErrorNotification, openNotification } from '../../helpers/NotificationHelper';

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

    const [consentModalVisible, setConsentModalVisible] = useState<boolean>(false);
    const [gdprModalVisible, setGdprModalVisible] = useState<boolean>(false);



    const submitForm = (name: string, surname: string) => {
        const customer: ICustomer = {
            id: 0,
            customerName: name,
            customerSurname: surname
        };
        new ReceiptClient().addReceipt(customer as Customer).then(r => {
            openNotification(`Tworzenie nowego rachunku...`, `Wykonano pomyślnie.`);
        }).catch(ex => {
            openErrorNotification(`Tworzenie nowego rachunku...`, `Błąd przy zapisie do bazy danych.`);
        });

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
    const onConsentClick = () => {
        setConsentModalVisible(true);
    }

    const onGDPRClick = () => {
        setGdprModalVisible(true);
    }

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
                        },
                        {
                            min: 2,
                            max: 50,
                            message: "Nieprawidłowa długość"
                        }]}>
                        <Input
                            size="large"
                            type="text"
                            placeholder={"Nazwisko"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="consentAgreement"
                        valuePropName="checked"
                        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Wymagana zgoda') }]}
                        {...tailLayout}
                    >
                        <Checkbox>
                            Akceptuję <Link to="#" onClick={() => onConsentClick()}>regulamin</Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="gdprAgreement"
                        valuePropName="checked"
                        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Wymagana zgoda') }]}
                        {...tailLayout}
                    >
                        <Checkbox>
                            Akceptuję <Link to="#" onClick={() => onGDPRClick()}>RODO</Link>
                        </Checkbox>
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
            </div >
        );
    }

    return (<>
        {DisplayForms()}
        <ConsentContentModal modalVisible={consentModalVisible} setModalVisible={setConsentModalVisible} />
        <GdprContent modalVisible={gdprModalVisible} setModalVisible={setGdprModalVisible} />

    </>);
}
export default InnerConsentForm;