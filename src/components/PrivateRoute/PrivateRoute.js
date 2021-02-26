import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

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
