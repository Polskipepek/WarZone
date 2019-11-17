import React, { Component } from 'react';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import { RouteComponentProps, Route, Switch, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ConsentForm from './pages/ConsentForm';
import Offer from './pages/Offer';
import Home from './pages/Home';
import { JSXElement } from '@babel/types';
import Resources from '../Resources';


const { Header, Content, Footer } = Layout;

const WarzoneLayoutInner: React.FunctionComponent<RouteComponentProps> = (props) => {


    const changePage = (page: string) => {
        props.history.push(page);
    }

    const getCurrentSelectedPage = () => {
        //alert("SPRAWDZAM");
        switch (props.history.location.pathname) {
            case Resources.pageAdresses.consent:
                return "2";
            case Resources.pageAdresses.home:
                return "1";
            case Resources.pageAdresses.offer:
                return "3";
        }
        return "1";
    }

    return (
        <Layout className="layout">
            <Header color="white" >
                <div className="logo" onClick={() => changePage(Resources.pageAdresses.home)}>
                    <img src="http://www.war-zone.com.pl/wp-content/uploads/2016/01/LOGO_FB.png" style={{
                        maxHeight: "64px",
                        height: "auto",
                        width: "auto",
                        display: "inline",
                        marginLeft: 10

                    }}>
                    </img>

                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={[getCurrentSelectedPage() as string]}
                    style={{
                        margin: "20px 80px",
                        lineHeight: "32px"
                    }}
                    theme="dark"
                >
                    <Menu.Item onClick={() => changePage(Resources.pageAdresses.home)} key="1">
                        Strona Główna
						</Menu.Item>
                    <Menu.Item
                        onClick={() => changePage(Resources.pageAdresses.consent)}
                        key="2"
                    >
                        Regulamin
						</Menu.Item>
                    <Menu.Item
                        onClick={() => changePage(Resources.pageAdresses.offer)}
                        key="3"
                    >
                        Oferta
						</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '80px 25px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: window.screen.availHeight * .9 }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}><div className="kliven-centered">Created by KlivenINC</div></Footer>
        </Layout>
    );
};
export default withRouter(WarzoneLayoutInner);