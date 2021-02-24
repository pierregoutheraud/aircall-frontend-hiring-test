import api from "../../lib/api";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (username = null, password = null) => async dispatch => {
  try {
    let data = await api.login(username, password);
    const { user, access_token: accessToken } = data;
    return dispatch({ type: LOGIN_SUCCESS, user, accessToken });
  } catch (e) {
    console.log(e);
    return dispatch({ type: LOGIN_FAILURE });
  }
};

const initialState = {
  isAuthenticated: null,
  user: null,
  accessToken: null,
};

export default function (state = initialState, action) {
  const { type, auth, user, accessToken } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...auth,
        isAuthenticated: true,
        user,
        accessToken,
      };
    case LOGIN_FAILURE:
      return {
        ...auth,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
}
