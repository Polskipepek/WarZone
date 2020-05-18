import React from 'react';
import Resources from '../../Resources';
import { Collapse, Switch } from 'antd';
import { FunctionComponent } from 'react';

const { Panel } = Collapse;

interface IReceiptFilterCollapseProps {
    setClosedReceiptsSwitch: () => any;
}

const ReceiptFilterCollapse: FunctionComponent<IReceiptFilterCollapseProps> = (props) => {

    const onReceiptsSwitchChange = () => {
        props.setClosedReceiptsSwitch();
    }

    return (<>
        <Collapse>
            <Panel header="Filtry" key="1">
                <div>
                    {Resources.filters.openReceipts} <Switch onChange={() => onReceiptsSwitchChange()} /> {Resources.filters.closedReceipts}
                </div>
            </Panel>
        </Collapse>
    </>);
}

export default ReceiptFilterCollapse;