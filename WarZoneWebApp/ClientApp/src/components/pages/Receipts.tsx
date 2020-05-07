import EditReceiptPanelModal from '../receipt/EditReceiptPanelModal';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { AppContext, IAppContext } from '../../App';
import { IReceipt, ReceiptClient } from '../../ApiClient';
import { Row } from 'antd';

export interface IReceiptsProps {
    // receipts: IReceipt[],
    selectedReceipt: IReceipt | undefined
}

const Receipts: React.FunctionComponent<IReceiptsProps> = (props: IReceiptsProps) => {
    const [receipts, setReceipts] = useState<IReceipt[] | null>();
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);

    let refreshRetriesLeft = 5;

    const CreateReceipt = () => {
        console.log("szukamm");
        new ReceiptClient().getReceipts().then(e => {
            console.log(e);
            setReceipts(e);
        });
    }

    const RefreshReceipt = () => {
        if (refreshRetriesLeft > 0 && selectedReceipt) {
            new ReceiptClient().getReceipt(selectedReceipt.id).then(receipt => {
                if (receipt && receipts && receipt.modifyDate > selectedReceipt.modifyDate) {
                    refreshRetriesLeft = 0;
                    const receiptIndex = receipts.indexOf(selectedReceipt);
                    const newReceipts = receipts.filter(r => r.id != receipt.id);
                    newReceipts.splice(receiptIndex, 0, receipt);
                    setReceipts(newReceipts);
                    return;
                } else {
                    refreshRetriesLeft--;
                    setTimeout(() => RefreshReceipt(), 500);
                }
            });
        }
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
            <EditReceiptPanelModal receiptRefreshFunc={RefreshReceipt} />
        </>

    );
}

export default Receipts;

