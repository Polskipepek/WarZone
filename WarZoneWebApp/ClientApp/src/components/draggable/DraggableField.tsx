import _ from 'lodash';
import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Card } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';

export interface IDraggableFieldProps extends Layout {
    className: string;
    items: any[];
    rowHeight: number;
    /* onLayoutChange: () => void; */
    cols: number;
}

const DraggableField: FunctionComponent<IDraggableFieldProps> = (props: IDraggableFieldProps) => {
    const [layout, setLayout] = useState();

    useEffect(() => {
        setLayout(generateLayout())
    }, []);

    const generateLayout = () => {
        return props.items.map((item, i) => {
            let y: number = props.y || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: props.w,
                h: props.h,
                i: i.toString()
            };
        });
    }
    const generateDOM = () => {
        return props.items.map((item, index) => {
            return (
                <Card key={index}>
                    {item}
                </Card>
            );
        });
    }

    /* const onLayoutChange = (layout) => {
        props.onLayoutChange(layout);
    } */


    return (
        <ReactGridLayout
            {...props}
            layout={layout}
        >
            {generateDOM()}
        </ReactGridLayout>
    );
}

export default DraggableField;