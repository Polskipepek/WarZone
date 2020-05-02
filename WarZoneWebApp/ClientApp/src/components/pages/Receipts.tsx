import EditReceiptPanelModal from '../receipt/EditReceiptPanelModal';
import React, { useEffect, useState } from 'react';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { IReceipt, ReceiptClient } from '../../ApiClient';
import { Row } from 'antd';

export interface IReceiptsProps {
    // receipts: IReceipt[],
    selectedReceipt: IReceipt | undefined
}

const Receipts: React.FunctionComponent<IReceiptsProps> = (props: IReceiptsProps) => {
    const [receipts, setReceipts] = useState<IReceipt[] | null>();
    const [receiptRefreshFunc, setReceiptRefreshFunction] = useState<(() => void) | undefined>(undefined);

    const CreateReceipt = () => {
        console.log("szukamm");
        new ReceiptClient().getReceipts().then(e => {
            console.log(e);
            setReceipts(e);
        });
    }

    useEffect(() => {
        CreateReceipt();
    }, []);

    return (
        <>
            <Row >
                {receipts && receipts.map((receipt, index) => {
                    return (
                        <React.Fragment>
                            <ReceiptPanel receipt={receipt} id={index} setReceiptRefreshFunction={setReceiptRefreshFunction} />
                        </React.Fragment>
                    );
                })}
            </Row>
            <EditReceiptPanelModal receiptRefreshFunc={receiptRefreshFunc} setReceiptRefreshFunc={setReceiptRefreshFunction} />
        </>

    );
}

export default Receipts;

