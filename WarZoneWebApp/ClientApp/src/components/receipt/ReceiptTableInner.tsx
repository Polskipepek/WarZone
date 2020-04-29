import React, { useEffect, useState } from 'react';
import ReceiptPanel from './ReceiptPanel';
import { ITransactionListDto } from '../../ApiClient';
import { Pagination, Table } from 'antd';

interface IReceiptPanelProps {
    transactions: ITransactionListDto[];

}

export interface IReceiptTableValues {
    key?: number | undefined;
    name?: string | undefined;
    price?: number | undefined;
    count?: number | undefined;
    totalPrice?: number | undefined;
}

const ReceiptTableInner: React.FunctionComponent<IReceiptPanelProps> = props => {
    const genData = () => {
        let data: IReceiptTableValues[] = [];
        props.transactions.map((transaction, index) => {
            data.push({
                key: index,
                name: transaction.serviceName,
                price: transaction.price,
                count: transaction.count,
                totalPrice: transaction.totalPrice,
            });
        })
        return data;

    }
    const [valuesState, setValuesState] = useState<IReceiptTableValues[] | undefined>(genData());

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
                valuesState ?
                    <Table columns={columns} dataSource={valuesState} scroll={{ y: "39vh" }} pagination={false} />
                    :
                    ""
            }
        </>
    );
};

export default ReceiptTableInner;