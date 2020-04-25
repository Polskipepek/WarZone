import BasicLayout from '../DraggableProps/ShowcaseLayout';
import DraggableField from '../draggable/DraggableField';
import LoginForm, { ILoginFormProps } from '../LoginForm';
import React, { Component, FunctionComponent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

export interface IHomeProps {

}

const defaultBasicLayoutProps = {
    className: "layout",
    items: [
        "raz", "dwa", "trzy"
    ],
    rowHeight: 30,
    cols: 5,
    h: 10,
    i: "",
    w: 20,
    x: 0,
    y: 0
}

const Home: FunctionComponent<IHomeProps> = (props: IHomeProps) => {
    return (
        <DraggableField {...defaultBasicLayoutProps} />
        /*         <div className="kliven-centered" style={{ marginTop: window.screen.availHeight * 0.2 }}>
        
                </div> */
    );
}

export default Home;