import React from "react";
import {
  Icon,
  CallOutlined,
  CallFilled,
  RingingFilled,
} from "@aircall/tractor";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Icon
        className={styles.icon}
        component={CallFilled}
        color="primary.base"
        size={40}
      />
    </div>
  );
}
