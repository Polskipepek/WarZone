import React, { Children } from 'react';

interface IAuthorizedViewProps {
    children: any;
    authorized: boolean | undefined;
}

const AuthorizedView: React.FunctionComponent<IAuthorizedViewProps> = (props: IAuthorizedViewProps) => {

    return (
        <>
            {props.authorized && props.children}
        </>
    );
}

export default AuthorizedView;