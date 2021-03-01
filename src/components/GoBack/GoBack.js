import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { IconButton, ArrowSendOutlined } from "@aircall/tractor";
import useRouting from "../../hooks/useRouting";
import styles from "./GoBack.module.css";

GoBack.propTypes = {
  className: PropTypes.string,
};

export default function GoBack({ className }) {
  const { history, prevPath } = useRouting();

  function handleClick() {
    // Using prevPath instead of history.goBack to handle case
    // where we just arrived on website so that we can fallback on home
    history.push(prevPath);
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
