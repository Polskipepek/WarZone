import { Card } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';

const ReceiptCard: React.FunctionComponent = props => {

    ReactDOM.render(
        <div style={{ padding: '30px' }}>
            <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>, null


    );
    return (<div></div>);

};
export default ReceiptCard;