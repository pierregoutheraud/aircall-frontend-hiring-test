import api from "../lib/api";

export default function apiMiddleware({ dispatch, getState }) {
  return next => async action => {
    const {
      useApi = false,
      type,
      endpoint = null,
      body = null,
      method = "GET",
      onSuccess = data => Promise.resolve(data),
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

    dispatch({ type: requestType, loading: true });

    try {
      const data = await (method === "GET"
        ? api.get(endpoint)
        : api.post(endpoint, body));

      const payload = await onSuccess(data, dispatch, getState);

      dispatch({
        type: successType,
        loading: false,
        ...payload,
      });
    } catch (e) {
      dispatch({ type: failureType, loading: false });
    }
  };
}
