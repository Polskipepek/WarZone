import React from 'react';
import {
    Col,
    Row,
    Tooltip,
    Typography
    } from 'antd';
import { FunctionComponent } from 'react';
import { IReceipt, Receipt } from '../../ApiClient';

export interface IReceiptDetailsProps {
    receipt: IReceipt;
    totalPrice?: number | undefined;
}

const ReceiptDetails: FunctionComponent<IReceiptDetailsProps> = (props: IReceiptDetailsProps) => {
    const { creationDate, modifyDate, totalPrice } = props.receipt;
    const { customerName, customerSurname } = props.receipt.customer!;

    const getDescriptionShortcut = (description: string) => {
        const maxLength = 18;
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        else {
            return description;
        }
    }

    return (
        <>
            <Row>
                <Col span={14} >
                    <span style={{ paddingLeft: 5 }}>
                        <b>Imię i nazwisko: </b>
                        <Tooltip overlayClassName="tooltip-box" placement="bottomRight" title={(<div>
                            <span className="tooltip-title">{<b>Imię i nazwisko</b>}</span>
                            <div>{`${customerName} ${customerSurname}`}</div>
                        </div>)}>
                            <span>{getDescriptionShortcut(`${customerName} ${customerSurname}`)}</span>
                        </Tooltip>
                    </span>
                </Col>
                <Col span={6} >
                    <span style={{ paddingRight: 5 }}>
                        <b>Wartość koszyka:</b> {props.totalPrice ? props.totalPrice : totalPrice}zł
                </span>
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    <span style={{ paddingLeft: 5 }}>
                        <b>Zmodyfikowany:</b> {modifyDate.toLocaleDateString()} {modifyDate.toLocaleTimeString()}
                    </span>
                </Col>
                <Col span={6}>
                    <span style={{ paddingRight: 5 }}>
                        <b>Stworzony:</b> {creationDate.toLocaleDateString()} {creationDate.toLocaleTimeString().substring(0, 5)}
                    </span>
                </Col>
            </Row>
        </>
    );
}
export default ReceiptDetails;