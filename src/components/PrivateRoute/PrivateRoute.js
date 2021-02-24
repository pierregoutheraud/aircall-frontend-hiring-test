import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
