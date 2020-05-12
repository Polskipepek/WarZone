import AddReceiptPanel from '../receipt/AddReceiptPanel';
import EditReceiptPanelModal from '../receipt/EditReceiptPanelModal';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { AppContext, IAppContext } from '../../App';
import { IReceipt, ReceiptClient } from '../../ApiClient';
import { Row } from 'antd';

export interface IReceiptsProps {
    selectedReceipt: IReceipt | undefined
}

const Receipts: React.FunctionComponent<IReceiptsProps> = (props: IReceiptsProps) => {
    const [receipts, setReceipts] = useState<IReceipt[] | null>();
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);

    let refreshRetriesLeft = 5;

    const PullReceipts = () => {
        new ReceiptClient().getOpenReceipts().then(e => {
            setReceipts(e);
        });
    }

    useEffect(() => {
        PullReceipts();
    }, []);

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

    return (<>
        <Row>
            <AddReceiptPanel pullReceipts={PullReceipts} />
            {receipts && receipts.map((receipt, index) => {
                return (
                    <React.Fragment key={index}>
                        <ReceiptPanel receipt={receipt} id={index} />
                    </React.Fragment>
                );
            })}
        </Row>
        <EditReceiptPanelModal receiptRefreshFunc={RefreshReceipt} />
    </>);
}

export default Receipts;

