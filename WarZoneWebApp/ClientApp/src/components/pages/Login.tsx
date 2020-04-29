import LoginForm, { ILoginFormProps } from '../LoginForm';
import React, { Component, FunctionComponent } from 'react';
import { Form } from 'antd';
import { RouteComponentProps } from 'react-router';

export interface ILoginProps extends ILoginFormProps {

}

type ILoginJoinedProps = RouteComponentProps & ILoginProps;

const Login: React.FunctionComponent<ILoginJoinedProps> = (props: ILoginJoinedProps) => {
    return (
        <div className="kliven-centered" style={{ marginTop: window.screen.availHeight * 0.2 }}>
            <LoginForm TryLogin={props.TryLogin} />
        </div>
    );

}

export default Login;