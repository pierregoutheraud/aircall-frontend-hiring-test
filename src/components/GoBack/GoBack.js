import React from "react";
import cx from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { IconButton, ArrowSendOutlined } from "@aircall/tractor";
import styles from "./GoBack.module.css";

export default function GoBack({ className, fallback = "/" }) {
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  function handleClick() {
    history.push(from);
  }

  return (
    <main className={cx(styles.container, className)}>
      <IconButton
        onClick={handleClick}
        size={36}
        component={ArrowSendOutlined}
        color="grey.dark"
      />
    </main>
  );
}
