import React from 'react';
import ReceiptPanel from './ReceiptPanel';
import { ITransactionListDto } from '../../ApiClient';
import { Pagination, Table } from 'antd';

interface IReceiptPanelProps {
    transactions: ITransactionListDto[];
}

const ReceiptTableInner: React.FunctionComponent<IReceiptPanelProps> = props => {
    const colWidth = "100px";
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



    const genData = () => {
        let data: any[] = [];
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


    return (
        <Table columns={columns} dataSource={genData()} scroll={{ y: "40vh" }} pagination={false} />
    );
};

export default ReceiptTableInner;