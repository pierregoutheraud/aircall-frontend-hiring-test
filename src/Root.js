import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tractor } from "@aircall/tractor";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CallPage from "./pages/CallPage/CallPage";

export default function Root() {
  return (
    <Tractor injectStyle>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/call/:callId">
              <CallPage />
            </PrivateRoute>
            <PrivateRoute path="/:page?">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    </Tractor>
  );
}
