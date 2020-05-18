import React, { useEffect, useState } from 'react';
import ReceiptPanel from './ReceiptPanel';
import ServiceFinder from './ServiceFinder';
import { Button, Pagination, Table } from 'antd';
import { IService, ITransactionListDto } from '../../ApiClient';

interface IReceiptPanelProps {
    tableValues: IReceiptTableValues[];
    editMode?: boolean;
    changeCountValue: (newValue: number, service: IService) => void;
}

export interface IReceiptTableValues extends ITransactionListDto {
    key: number;
}

const ReceiptTableInner: React.FunctionComponent<IReceiptPanelProps> = props => {

    const columns = [
        {
            title: 'Nazwa usługi',
            dataIndex: 'serviceName',
            key: 'serviceName',
            width: "40%",
            render: (value: string, record: IReceiptTableValues) => {
                return (
                    (props.editMode) ? (
                        (record.serviceId === 2137) ? (<>
                            <ServiceFinder changeCountValue={props.changeCountValue} />
                        </>) : (record.serviceName)
                    ) : (record.serviceName)
                )
            }
        },
        {
            title: 'Cena',
            dataIndex: 'price',
            key: 'price',
            width: "17%",
        },
        {
            title: 'Ilość',
            dataIndex: 'count',
            key: 'count',
            width: "23%",
            render: (value: number, record: IReceiptTableValues) => {
                return (record.serviceId != 2137 && /* props.editMode && props.editMode === true ? */ (
                    <span>
                        <Button size="small" onClick={() => { props.changeCountValue(Number(record.count) - 1, { ...record, servicePrice: record.price, id: record.serviceId } as IService) }}>-</Button>
                        &ensp;{`${record.count}`}&ensp;
                        <Button size="small" onClick={() => { props.changeCountValue(Number(record.count) + 1, { ...record, servicePrice: record.price, id: record.serviceId } as IService) }}>+</Button>
                    </span>
                ) /* : <span>&ensp;{`${record.count}`}&ensp;</span> */
                );
            }
        },
        {
            title: 'Razem',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: "20%",
        },
    ];

    return (<>
        {props.tableValues ?
            <Table columns={columns} dataSource={props.tableValues} scroll={{ y: "39vh" }} pagination={false} />
            :
            ""
        }
    </>);
};

export default ReceiptTableInner;