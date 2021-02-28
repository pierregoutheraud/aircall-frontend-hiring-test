import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
    // I really want to run this effect only once. Ignoring exhaustive-deps here should be fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
