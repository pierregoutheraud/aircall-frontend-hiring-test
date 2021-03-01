import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tractor } from "@aircall/tractor";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CallPage from "./pages/CallPage/CallPage";

export default function Root() {
  return (
    <Tractor injectStyle>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/call/:callId">
              <CallPage />
            </PrivateRoute>
            <PrivateRoute path="/:page?">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    </Tractor>
  );
}
