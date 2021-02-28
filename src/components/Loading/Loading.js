import React from "react";
import cx from "classnames";
import { Icon, CallFilled } from "@aircall/tractor";
import styles from "./Loading.module.css";

export default function Loading({ className }) {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.wrapper}>
        <Icon
          className={styles.icon}
          component={CallFilled}
          color="primary.base"
          size={40}
        />
      </div>
    </div>
  );
}
