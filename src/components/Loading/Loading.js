import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Icon, CallFilled } from "@aircall/tractor";
import styles from "./Loading.module.css";

Loading.propTypes = {
  className: PropTypes.string,
};

export default function Loading({ className }) {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.wrapper}>
        <Icon
          className={styles.icon}
          component={CallFilled}
          color="primary.base"
          size={40}
          role="img"
        />
      </div>
    </div>
  );
}
