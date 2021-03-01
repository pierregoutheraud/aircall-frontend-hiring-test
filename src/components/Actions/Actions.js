import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Spacer, Button, ArchiveOutlined } from "@aircall/tractor";
import styles from "./Actions.module.css";

Actions.propTypes = {
  className: PropTypes.string,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function Actions({
  className,
  onArchive = () => {},
  onUnarchive = () => {},
  disabled = false,
}) {
  return (
    <Spacer className={cx(styles.buttons, className)} space="s">
      <Button
        disabled={disabled}
        variant="destructive"
        onClick={onArchive}
        role="button"
        aria-label="archive"
      >
        <ArchiveOutlined /> Archive
      </Button>
      <Button
        disabled={disabled}
        onClick={onUnarchive}
        role="button"
        aria-label="unarchive"
      >
        <ArchiveOutlined /> Unarchive
      </Button>
    </Spacer>
  );
}
