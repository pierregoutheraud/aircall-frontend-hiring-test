import auth, { LOGIN_SUCCESS, LOGIN_FAILURE } from "./auth";

describe("auth reducer", () => {
  test("should handle LOGIN_SUCCESS", () => {
    const user = {
      id: "idTest",
      username: "usernameTest",
    };
    const accessToken = "accessTokenTest";
    const state1 = auth(undefined, { type: LOGIN_SUCCESS, user, accessToken });

    expect(state1).toEqual({
      isAuthenticated: true,
      user,
      accessToken,
    });
  });

  test("should handle LOGIN_FAILURE", () => {
    const state0 = {
      isAuthenticated: true,
      user: {
        id: "idTest",
        username: "usernameTest",
      },
      accessToken: "accessTokenTest",
    };

    const state1 = auth(state0, { type: LOGIN_FAILURE });

    expect(state1).toEqual({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  });
});
