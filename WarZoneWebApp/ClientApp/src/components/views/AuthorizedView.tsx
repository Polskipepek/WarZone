import React, { Children } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface IAuthorizedViewProps {
    children: any;
    authorized: boolean | undefined;
}

type IMergedAuthorizedViewProps = IAuthorizedViewProps & RouteComponentProps;

const AuthorizedView: React.FunctionComponent<IMergedAuthorizedViewProps> = (props: IAuthorizedViewProps) => {

    return (
        <>
            {props.authorized && props.children}
        </>
    );
}

export default withRouter(AuthorizedView);