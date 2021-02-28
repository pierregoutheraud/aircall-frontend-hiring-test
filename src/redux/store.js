import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import apiMiddleware from "./apiMiddleware";
import rootReducer from "./modules/index";

const middlewares = [thunk, apiMiddleware];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, composedEnhancer);

export default store;

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./modules/index.js", () =>
    store.replaceReducer(rootReducer)
  );
}
