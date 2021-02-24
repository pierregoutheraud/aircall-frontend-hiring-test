import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Root() {
  return <Provider store={store}></Provider>;
}
