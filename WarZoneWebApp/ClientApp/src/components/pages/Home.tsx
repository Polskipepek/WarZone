import React, { Component } from 'react';
import { Button } from 'antd';

export default class Home extends Component<any> {
    render() {
        return (
            <div>
                {this.DisplayHeaderLogo()}
                {this.DisplayPageSelectionButtons()}
            </div>
        );
    }

    DisplayHeaderLogo() {
        return (
            <div>
                <img src="http://www.war-zone.com.pl/wp-content/uploads/2016/01/LOGO_FB.png" style={{
                    maxWidth: "200px",
                    height: "auto",
                    width: "auto",
                    display: "block",
                    marginLeft: window.innerWidth / 2 - 100,

                } as React.CSSProperties}>
                </img>

            </div>
        );
    }

    DisplayPageSelectionButtons() {
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
                    onClick={()=> this.props.history.push("/offerlogin")}
                >
                    Oferta
                </Button>
            </div>
        );
    }
}