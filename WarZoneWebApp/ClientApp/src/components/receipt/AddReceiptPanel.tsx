import AddReceiptModal from './AddReceiptModal';
import React, { FunctionComponent, useState } from 'react';
import { Button, Card, Col } from 'antd';
import { IReceipt } from '../../ApiClient';
import { UserAddOutlined } from '@ant-design/icons';

interface IAddReceiptPanel {
    pullReceipts: () => void;
}

const AddReceiptPanel: FunctionComponent<IAddReceiptPanel> = (props) => {

    const [isModalShown, setModalShown] = useState<boolean>(false);

    const toggleModalVisibility = () => {
        return setModalShown(!isModalShown);
    }

    return (<>
        <Col span={8}>
            <Card style={{ width: "28vw", height: "100%", maxHeight: "29vh" }}>
                <div className="center">
                    <Button
                        onClick={() => toggleModalVisibility()}
                        size="large"
                    >
                        <UserAddOutlined style={{ verticalAlign: "middle" }} />
                        Utwórz nowy rachunek
                    </Button>
                </div>
            </Card>
            <AddReceiptModal isVisible={isModalShown} setVisible={toggleModalVisibility} pullReceipts={props.pullReceipts} />
        </Col>
    </>);
}

export default AddReceiptPanel;