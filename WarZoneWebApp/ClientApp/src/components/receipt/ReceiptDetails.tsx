import React from 'react';
import { Col, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import { IReceipt, Receipt } from '../../ApiClient';

export interface IReceiptDetailsProps {
    receipt: IReceipt;
}

const ReceiptDetails: FunctionComponent<IReceiptDetailsProps> = (props: IReceiptDetailsProps) => {
    const { creationDate, modifyDate, totalPrice } = props.receipt;
    const { customerName, customerSurname } = props.receipt.customer!;

    return (
        <>
            <Row>
                <Col flex="auto">
                    <span style={{ paddingLeft: 10 }}>
                        <b>Imię i nazwisko:</b> {customerName} {customerSurname}
                    </span>
                    <span style={{ paddingRight: 10 }}>
                        <b>Wartość koszyka:</b> {totalPrice}zł
                </span>
                </Col>
                <Col flex="auto">
                    <span style={{ paddingLeft: 10 }}>
                        <b>Zmodyfikowany:</b> {modifyDate.toLocaleDateString()} {modifyDate.toLocaleTimeString()}
                    </span>
                    <span style={{ paddingRight: 10 }}>
                        <b>Stworzony:</b> {creationDate.toLocaleDateString()} {creationDate.toLocaleTimeString()}
                    </span>
                </Col>
            </Row>
        </>
    );
}
export default ReceiptDetails;