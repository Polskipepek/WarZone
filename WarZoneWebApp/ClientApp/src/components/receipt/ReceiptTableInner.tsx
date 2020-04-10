import React from 'react';
import { ITransaction } from '../../ApiClient';
import { Table } from 'antd';
import './receipt.css';

interface IReceiptPanelProps {
    transactions: ITransaction[];
}

const ReceiptTableInner: React.FunctionComponent<IReceiptPanelProps> = props => {
    const colWidth = "100px";
    const columns = [
        {
            title: 'Nazwa usługi',
            dataIndex: 'name',
            key: 'name',
            width: colWidth,
            render: (text: React.ReactNode) => <a>{text}</a>
        },
        {
            title: 'Cena',
            dataIndex: 'price',
            key: 'price',
            width: colWidth
        },
        {
            title: 'Tag',
            key: 'tags',
            dataIndex: 'tags',
            width: colWidth,
            render: (tags: any[]) => (
                <span>
                    {/*  {tags.map((tag: string) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'weapon') {
                            color = 'volcano';
                        }
                        if (tag === 'wejsciowka') {
                            color = 'black';
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })} */}
                </span>
            ),
        },
    ];

    const dataa = [
        {
            key: '1',
            name: 'John Brown',
            price: 32,
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            price: 42,
            tags: ['weapon'],
        },

    ];



    const genData = () => {
        let data: any[] = [];
        props.transactions.map((transaction, index) => {
            data.push({
                key: index,
                name: transaction.service!.serviceName,
                price: transaction.service!.servicePrice,
            });
        })
        return data;
    }


    return (
        <Table columns={columns} dataSource={genData()} />
    );
};

export default ReceiptTableInner;