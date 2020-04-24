import BasicLayout from '../DraggableProps/ShowcaseLayout';
import LoginForm, { ILoginFormProps } from '../LoginForm';
import React, { Component, FunctionComponent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

export interface IHomeProps {

}

const defaultBasicLayoutProps = {
    className: "layout",
    items: 5,
    rowHeight: 30,
    onLayoutChange: () => { },
    cols: 5,
    h: 0,
    i: "",
    w: 0,
    x: 0,
    y: 0
}

const Home: FunctionComponent<IHomeProps> = (props: IHomeProps) => {
    return (
        <BasicLayout {...defaultBasicLayoutProps} />
        /*         <div className="kliven-centered" style={{ marginTop: window.screen.availHeight * 0.2 }}>
        
                </div> */
    );
}

export default Home;