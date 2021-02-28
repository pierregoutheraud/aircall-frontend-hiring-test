import api from "../../lib/api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// A more elegant solution is to create a redux middleware
// to store data we need in local storage (redux-persist)
function setAuthInLocalStorage(accessToken) {
  const expiredAt = Date.now() + 10 * 60 * 1000;
  localStorage.setItem("auth", JSON.stringify({ accessToken, expiredAt }));
  return expiredAt;
}

export const login = (
  username = null,
  password = null,
  refreshToken = false
) => async dispatch => {
  try {
    const { user, access_token: accessToken } = refreshToken
      ? await api.post("/auth/refresh-token")
      : await api.login(username, password);

    api.setAccessToken(accessToken);
    const expiredAt = setAuthInLocalStorage(accessToken);
    return dispatch(hasLoggedIn(user, accessToken, expiredAt));
  } catch (e) {
    console.log(e);
    return dispatch(logout());
  }
};

export function logout() {
  clearTimeout(timeoutRefreshToken);
  localStorage.removeItem("auth");
  api.setAccessToken(null);
  return {
    type: LOGIN_FAILURE,
  };
}

export const checkAuth = () => async dispatch => {
  const auth = JSON.parse(window.localStorage.getItem("auth"));

  if (!auth) {
    return dispatch(logout());
  }

  const { accessToken, expiredAt } = auth;
  const isTokenExpired = Date.now() > expiredAt;

  if (isTokenExpired) {
    return dispatch(logout());
  }

  try {
    api.setAccessToken(accessToken);
    const user = await api.get("/me");

    return dispatch(hasLoggedIn(user, accessToken, expiredAt));
  } catch (e) {
    return dispatch(logout());
  }
};

let timeoutRefreshToken = null;
export const hasLoggedIn = (user, accessToken, expiredAt) => (
  dispatch,
  getState
) => {
  // Refresh token 1 minute before it expires
  const refreshTokenAt = expiredAt - 60000;

  if (Date.now() >= refreshTokenAt) {
    return dispatch(login(null, null, true));
  } else {
    const refreshTokenIn = refreshTokenAt - Date.now();
    timeoutRefreshToken = setTimeout(
      () => dispatch(login(null, null, true)),
      refreshTokenIn
    );
  }

  return dispatch({ type: LOGIN_SUCCESS, user, accessToken, expiredAt });
};

const initialState = {
  isAuthenticated: null,
  user: null,
  accessToken: null,
  expiredAt: null,
};

export default function auth(state = initialState, action) {
  const { type, user, accessToken, expiredAt } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken,
        expiredAt,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        expiredAt: null,
      };
    default:
      return state;
  }
}
