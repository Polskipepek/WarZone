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
                            <ReceiptPanel receipt={receipt} id={index} />
                        </React.Fragment>
                    );
                })}
            </Row>
            <EditReceiptPanelModal />
        </>

    );
}

export default Receipts;

