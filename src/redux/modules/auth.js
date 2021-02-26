import api from "../../lib/api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (username = null, password = null) => async dispatch => {
  try {
    let data = await api.login(username, password);
    const { user, access_token: accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    // I should not have to store user, but since api route /me does not work
    // I set it as a workaround
    localStorage.setItem("user", JSON.stringify(user));
    return dispatch({ type: LOGIN_SUCCESS, user, accessToken });
  } catch (e) {
    console.log(e);
    return dispatch(logout());
  }
};

export function logout() {
  ["user", "accessToken"].forEach(key => localStorage.removeItem(key));
  api.setAccessToken(null);
  return {
    type: LOGIN_FAILURE,
  };
}

export const checkAuth = () => async dispatch => {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    return dispatch(logout());
  }

  const user = JSON.parse(window.localStorage.getItem("user"));
  api.setAccessToken(accessToken);

  try {
    // Here I should be using the api route /me but this route does not seem to work (404)
    // so I am using route /calls instead just to check if accessToken is valid
    // await api.get("/me");
    await api.get("/calls?limit=0");
    return dispatch({ type: LOGIN_SUCCESS, user, accessToken });
  } catch (e) {
    return dispatch(logout());
  }
};

const initialState = {
  isAuthenticated: null,
  user: null,
  accessToken: null,
};

export default function (state = initialState, action) {
  const { type, user, accessToken } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
}
