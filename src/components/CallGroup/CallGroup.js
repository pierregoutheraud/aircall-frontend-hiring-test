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

export default function CallGroup({ label = null, children, ...rest }) {
  const _children = React.Children.map(children, (child, i) => {
    return (
      <div
        key={child.key || i}
        className={styles.child}
        role="listitem"
        aria-label="child wrapper"
      >
        {child}
      </div>
    );
  });

  return (
    <div className={styles.container} {...rest}>
      {label && (
        <Typography variant="subheading2" mt="-5px" mb="15px">
          {label}
        </Typography>
      )}
      {_children}
    </div>
  );
}
