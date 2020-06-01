import AddReceiptPanel from '../receipt/AddReceiptPanel';
import EditReceiptPanelModal from '../receipt/EditReceiptPanelModal';
import React, { useContext, useEffect, useState } from 'react';
import ReceiptFilterCollapse from '../receipt/ReceiptsFilterCollapse';
import ReceiptPanel from '../receipt/ReceiptPanel';
import { AppContext, IAppContext } from '../../App';
import { IReceipt, ReceiptClient, Customer, ReceiptAndCustomerBinder, ReceiptAndCustomerBinderClient } from '../../ApiClient';
import { openNotification } from '../../helpers/NotificationHelper';
import { Row } from 'antd';

export interface IReceiptsProps {
    selectedReceipt: IReceipt | undefined
}

const Receipts: React.FunctionComponent<IReceiptsProps> = (props: IReceiptsProps) => {
    const [receipts, setReceipts] = useState<IReceipt[] | null>();
    const { selectedReceipt, toggleSelectedReceipt } = useContext<IAppContext>(AppContext);
    const [closedReceiptsSwitch, setClosedReceiptsSwitch] = useState<boolean>(false);
    const [AvailableCustomers, setAvailableCustomers] = useState<Customer[]>([]);

    let refreshRetriesLeft = 5;

    const PullReceipts = () => {
        if (closedReceiptsSwitch !== true) {
            new ReceiptClient().getOpenReceipts().then(e => {
                setReceipts(e);
            });
        } else {
            new ReceiptClient().getClosedReceipts().then(e => {
                setReceipts(e);
            });
        }
    }

    useEffect(() => {
        PullReceipts();
        new ReceiptAndCustomerBinderClient().getAvailableCustomers().then((c)=>{
            if(c!==null){
                setAvailableCustomers(c);
            }
        })
    }, []);

    useEffect(() => {
        PullReceipts();
    }, [closedReceiptsSwitch]);

    const RefreshReceipt = () => {
        if (refreshRetriesLeft > 0 && selectedReceipt) {
            new ReceiptClient().getReceipt(selectedReceipt.id).then(receipt => {
                if (receipt && receipts && receipt.modifyDate > selectedReceipt.modifyDate) {
                    refreshRetriesLeft = 0;
                    const receiptIndex = receipts.indexOf(selectedReceipt);
                    const newReceipts = receipts.filter(r => r.id != receipt.id);
                    newReceipts.splice(receiptIndex, 0, receipt);
                    setReceipts(newReceipts);
                    openNotification(`Modyfikacja rachunku.`, `Modyfikacja rachunku ${receipt.id} przebiegła pomyślnie.`);
                    return;
                } else {
                    refreshRetriesLeft--;
                    setTimeout(() => RefreshReceipt(), 500);
                }
            });
        }
    }

    const toggleClosedReceiptSwitch = () => {
        setClosedReceiptsSwitch(!closedReceiptsSwitch);
    }

    return (<>
        <ReceiptFilterCollapse setClosedReceiptsSwitch={() => toggleClosedReceiptSwitch()} />
        <Row>
            {closedReceiptsSwitch !== true && <AddReceiptPanel pullReceipts={PullReceipts} />}
            {receipts && receipts.map((receipt, index) => {
                return (
                    <React.Fragment key={index}>
                        <ReceiptPanel receipt={receipt} id={index} />
                    </React.Fragment>
                );
            })}
        </Row>
        <EditReceiptPanelModal receiptRefreshFunc={RefreshReceipt} getAvailableCustomers={AvailableCustomers} setAvailableCustomers={setAvailableCustomers} />
    </>);
}

export default Receipts;
