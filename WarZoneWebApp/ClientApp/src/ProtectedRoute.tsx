import React, { Component, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute: React.FunctionComponent<Component> = (component: Component, { ...rest }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean)

  const array1 = [1, 2, 3, 4, 5];
  const array2 = [63, 523, 65, 78, "sxdd"];

  const arrayMerged = ["69", "dupa", ...array1, "huj", ...array2];

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
