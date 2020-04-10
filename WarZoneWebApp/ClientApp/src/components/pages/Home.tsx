import LoginForm from '../LoginForm';
import React, { Component } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

class HomeInner extends Component<RouteComponentProps & FormComponentProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            consentCheckbox: false
        }
    }

    render() {
        return (
            <div className="kliven-centered" style={{ marginTop: window.screen.availHeight * 0.2 }}>
                <LoginForm />
            </div>
        );
    }


    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
}

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const Home = Form.create()(HomeInner);
export default Home;

/* DisplayPageSelectionButtons = () => {
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
                onClick={() => this.props.history.push("/offer")}
            >
                Oferta
            </Button>
        </div>
    );
} */