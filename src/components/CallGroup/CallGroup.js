import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@aircall/tractor";
import styles from "./CallGroup.module.css";

CallGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default function CallGroup({ label = null, children }) {
  const _children = children.map(child => {
    return (
      <div key={child.key} className={styles.child}>
        {child}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      {label && (
        <Typography variant="subheading2" mt="-5px" mb="15px">
          {label}
        </Typography>
      )}
      {_children}
    </div>
  );
}
