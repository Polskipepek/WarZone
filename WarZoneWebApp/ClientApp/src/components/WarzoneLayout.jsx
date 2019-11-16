import React, { Component } from 'react';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ConsentForm from './pages/ConsentForm';
import Offer from './pages/Offer';
import Home from './pages/Home';
import { JSXElement } from '@babel/types';


const { Header, Content, Footer } = Layout;

const WarzoneLayoutInner = (props) => (

    <Layout className="layout">
        <Header color="white">
            <div className="logo">
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
                defaultSelectedKeys={["1"]}
                style={{
                    margin: "20px 80px",
                    lineHeight: "32px"
                }}
                theme="dark"
            >
                <Menu.Item onClick={() => props.history.push("/dashboard")} key="1">
                    Strona Główna
						</Menu.Item>
                <Menu.Item
                    onClick={() => props.history.push("/consent")}
                    key="2"
                >
                    Regulamin
						</Menu.Item>
                <Menu.Item
                    onClick={() => props.history.push("/offer")}
                    key="3"
                >
                    Oferta
						</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Route {...props} />
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
);

const WarzoneLayout = (props) => (
    <Switch>
        <WarzoneLayoutInner {...props} path="/dashboard" component={Home} />
        <WarzoneLayoutInner {...props} path="/consent" component={ConsentForm} />
        <WarzoneLayoutInner {...props} path="/offer" component={Offer} />
    </Switch>


);
export default WarzoneLayout;