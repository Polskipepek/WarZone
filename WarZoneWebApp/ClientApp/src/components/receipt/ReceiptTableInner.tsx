import React, { useEffect, useState } from 'react';
import ReceiptPanel from './ReceiptPanel';
import { Button, Pagination, Table } from 'antd';
import { ITransactionListDto } from '../../ApiClient';

interface IReceiptPanelProps {
    tableValues: IReceiptTableValues[];
    editMode?: boolean;
    changeCountValue: (id: number, newValue: number) => void;
}

export interface IReceiptTableValues {
    key: number;
    name?: string | undefined;
    price?: number | undefined;
    count?: number | undefined;
    totalPrice?: number | undefined;
}

const ReceiptTableInner: React.FunctionComponent<IReceiptPanelProps> = props => {

    const columns = [
        {
            title: 'Nazwa usługi',
            dataIndex: 'name',
            key: 'name',
            width: "40%",
            render: (text: React.ReactNode) => <a>{text}</a>
        },
        {
            title: 'Cena',
            dataIndex: 'price',
            key: 'price',
            width: "20%",
        },
        {
            title: 'Ilość',
            dataIndex: 'count',
            key: 'count',
            width: "20%",
            render: (value: number, record: IReceiptTableValues) => {
                return (
                    props.editMode ? (
                        <span>
                            <Button size="small" onClick={() => { props.changeCountValue(record.key, Number(record.count) - 1) }}>-</Button>
                            &ensp;{`${record.count}`}&ensp;
                        <Button size="small" onClick={() => { props.changeCountValue(record.key, Number(record.count) + 1) }}>+</Button>
                        </span >
                    ) : (record.count)
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



    return (
        <>
            {
                props.tableValues ?
                    <Table columns={columns} dataSource={props.tableValues} scroll={{ y: "39vh" }} pagination={false} />
                    :
                    ""
            }
        </>
    );
};

export default ReceiptTableInner;