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
}

const ReceiptDetails: FunctionComponent<IReceiptDetailsProps> = (props: IReceiptDetailsProps) => {
    const { creationDate, modifyDate, totalPrice } = props.receipt;
    const { customerName, customerSurname } = props.receipt.customer!;

    const getDescriptionShortcut = (description: string) => {
        if (description.length > 30) {
            return `${description.substring(0, 30)}...`;
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
                        <b>Wartość koszyka:</b> {totalPrice}zł
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
                        <b>Stworzony:</b> {creationDate.toLocaleDateString()} {creationDate.toLocaleTimeString()}
                    </span>
                </Col>
            </Row>
        </>
    );
}
export default ReceiptDetails;