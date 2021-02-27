import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Form,
  Grid,
  FormItem,
  TextFieldInput,
  Button,
} from "@aircall/tractor";
import styles from "./Login.module.css";

/*
This is not a fancy login page (No error report, no loading etc.) but I did not want to spend too much time on this part of the app.
Also in the documentation of Traktor there is a onSubmit prop on the form, but I tried using it and it was not called.
I am sure you have a better way to get the data from the form but I could not find the if so I did a very simple solution with onChange and onClick props.
*/

export default function Login() {
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (!username.length || !password.length) {
      return;
    }

    try {
      await auth.login(username, password);
      history.replace(from);
    } catch (e) {
      return console.log(e);
    }
  }

  return (
    <main className={styles.container}>
      <Box width="400px">
        <Form>
          <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns="1fr">
            <FormItem label="Username" name="username">
              <TextFieldInput
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormItem>
            <FormItem label="Password" name="email">
              <TextFieldInput
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormItem>
            <FormItem onClick={handleSubmit}>
              <Button block>Login</Button>
            </FormItem>
          </Grid>
        </Form>
      </Box>
    </main>
  );
}
