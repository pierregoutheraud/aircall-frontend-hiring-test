import api from "../lib/api";

export default function apiMiddleware({ dispatch, getState }) {
  return next => async action => {
    const {
      useApi = false,
      type,
      endpoint = null,
      body = null,
      method = "GET",
      onSuccess = data => data,
      ...restAction
    } = action;

    if (!useApi) {
      return next(action);
    }

    if (endpoint === null) {
      throw new Error("Send an endpoint.");
    }

    const requestType = type + "_REQUEST";
    const successType = type + "_SUCCESS";
    const failureType = type + "_FAILURE";

    dispatch({ type: requestType, apiLoading: true, ...restAction });

    try {
      const data = await api.call(method, endpoint, body);
      const payload = onSuccess(data, dispatch, getState);

      dispatch({
        type: successType,
        apiLoading: false,
        ...restAction,
        ...payload,
      });
    } catch (e) {
      dispatch({ type: failureType, apiLoading: false, ...restAction });
    }
  };
}
