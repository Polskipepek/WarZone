import React from 'react';
import Resources from '../../Resources';
import { Collapse, Switch } from 'antd';
import { FunctionComponent } from 'react';

const { Panel } = Collapse;

interface IReceiptFilterCollapseProps {
    pullRequest: (bool: boolean) => void,
}

const ReceiptFilterCollapse: FunctionComponent<IReceiptFilterCollapseProps> = (props) => {

    const onReceiptsSwitchChange = (value: boolean) => {
        props.pullRequest(value);
    }

    return (<>
        <Collapse>
            <Panel header="Filtry" key="1">
                <div>
                    {Resources.filters.openReceipts} <Switch onChange={(value) => onReceiptsSwitchChange(value)} /> {Resources.filters.closedReceipts}
                </div>
            </Panel>
        </Collapse>
    </>);
}

export default ReceiptFilterCollapse;