import React from 'react';
import { FunctionComponent } from 'react';
import { IReceipt, Receipt } from '../../ApiClient';
import { Typography } from 'antd';

export interface IReceiptDetailsProps {
    receipt: IReceipt;
}

const ReceiptDetails: FunctionComponent<IReceiptDetailsProps> = (props: IReceiptDetailsProps) => {
    const { creationDate, modifyDate, totalPrice } = props.receipt;
    const { customerName, customerSurname } = props.receipt.customer!;

    return (
        <>
            <Typography.Paragraph>
                Godność: {customerName} {customerSurname}, całe te: {totalPrice}zl
            </Typography.Paragraph>
            <Typography.Paragraph>
                Stworzony: {creationDate}, Zmodyfikowany: {modifyDate}
            </Typography.Paragraph>

        </>
    );
}
export default ReceiptDetails;