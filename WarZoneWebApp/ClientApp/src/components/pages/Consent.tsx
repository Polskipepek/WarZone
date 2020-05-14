import ConsentForm from '../Consents/ConsentForm';
import React, { useState } from 'react';
import {
    Form,
} from 'antd';


const Consent: React.FunctionComponent = (props) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [form] = Form.useForm();


    const showModal = (e: any) => {
        setVisible(true)
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

    return (
        <div>
            <div className="kliven-centered">
                <ConsentForm />

            </div>
        </div >
    );
}
export default Consent;