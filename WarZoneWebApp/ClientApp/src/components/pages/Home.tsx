import React, { Component } from 'react';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router';
import WarzoneLayout from '../WarzoneLayout';

export default class Home extends Component<RouteComponentProps> {
    render() {
        return this.DisplayPageSelectionButtons();
    }
    DisplayPageSelectionButtons = () => {
        let butWidth = 300;
        return (
            <div>
                <Button type="primary" size="large" icon="edit" style={
                    {
                        display: "block",
                        width: butWidth,
                        height: 100,
                        position: "relative",
                        left: window.innerWidth / 2 - butWidth / 2,
                        marginTop: "40px",
                        fontSize: 35,
                    }
                }
                    onClick={() => { this.props.history.push("/consent") }}
                >
                    Formularz
                </Button>
                <Button size="large" icon="" style={{
                    display: "block",
                    width: butWidth,
                    height: 100,
                    position: "relative",
                    left: window.innerWidth / 2 - butWidth / 2,
                    marginTop: "20px",
                    fontSize: 35,
                }
                }
                    onClick={() => this.props.history.push("/offerlogin")}
                >
                    Oferta
                </Button>
            </div>
        );
    }
}