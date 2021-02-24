import { API_URL, __DEV__ } from "../constants";

class API {
  accessToken = null;
  url = API_URL;

  async login(username, password) {
    const data = await this.post("/auth/login", { username, password });
    const { access_token: accessToken } = data;
    this.accessToken = accessToken;
    return data;
  }

  get(endpoint) {
    return this.call("GET", endpoint);
  }

  post(endpoint, data = {}) {
    return this.call("POST", endpoint, data);
  }

  async call(method = "GET", endpoint, data = {}) {
    const fullUrl = this.url + endpoint;

    let body = null;
    if (method === "POST") {
      body = JSON.stringify({
        ...data,
      });
    }

    if (__DEV__) {
      console.log(method, fullUrl, JSON.parse(body));
    }

    const res = await fetch(fullUrl, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(this.accessToken && {
          Authorization: `Bearer ${this.accessToken}`,
        }),
      },
      ...(body && { body }),
    });

    try {
      const data = await res.json();
      if (data.error) {
        throw new Error(
          Array.isArray(data.message) ? data.message[0] : data.message
        );
      }
      return data;
    } catch (e) {
      throw new Error("An error occurred.");
    }
  }
}

export default new API();
