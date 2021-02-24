import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Login.module.css";

export default function Login() {
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  async function handleLogin() {
    try {
      await auth.login("pierre", "123");
      history.replace(from);
    } catch (e) {
      return console.log(e);
    }
  }

  return (
    <main className={styles.container}>
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}
