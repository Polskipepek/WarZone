import React, { Component, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute: React.FunctionComponent<Component> = (component: Component, { ...rest }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean)

  if (isAuthenticated === null) {
    return <></>
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
