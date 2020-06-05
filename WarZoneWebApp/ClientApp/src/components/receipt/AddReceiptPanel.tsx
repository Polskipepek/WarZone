import AddReceiptModal from './AddReceiptModal';
import React, { FunctionComponent, useState } from 'react';
import { Button, Card, Col } from 'antd';
import { IReceipt, ReceiptClient } from '../../ApiClient';
import { UserAddOutlined } from '@ant-design/icons';
import { openNotification, openErrorNotification } from '../../helpers/NotificationHelper';

interface IAddReceiptPanel {
    pullReceipts: () => void;
}

const AddReceiptPanel: FunctionComponent<IAddReceiptPanel> = (props) => {

    const OnClick = () => {
        new ReceiptClient().addReceipt().then(() => {
            openNotification(`Pomyślnie stworzono nowy rachunek.`, ``);
            props.pullReceipts();
        }).catch(ex => {
            openErrorNotification(`Błąd przy tworzeniu nowego rachunku.`, ``);
        })
    }

    return (<>
        <Col span={8}>
            <Card style={{ width: "28vw", height: "100%", maxHeight: "29vh" }}>
                <div className="center">
                    <Button
                        onClick={() => OnClick()}
                        size="large"
                    >
                        <UserAddOutlined style={{ verticalAlign: "baseline" }} />
                        Utwórz nowy rachunek
                    </Button>
                </div>
            </Card>
        </Col>
    </>);
}

export default AddReceiptPanel;