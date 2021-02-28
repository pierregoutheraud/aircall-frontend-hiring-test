import React from "react";
import PropTypes from "prop-types";
import { Spacer, Button, ArchiveOutlined } from "@aircall/tractor";
import styles from "./CallsActions.module.css";

CallsActions.propTypes = {
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function CallsActions({
  onArchive = () => {},
  onUnarchive = () => {},
  disabled = false,
}) {
  return (
    <Spacer className={styles.buttons} space="s">
      <Button disabled={disabled} variant="destructive" onClick={onArchive}>
        <ArchiveOutlined /> Archive
      </Button>
      <Button disabled={disabled} onClick={onUnarchive}>
        <ArchiveOutlined /> Unarchive
      </Button>
    </Spacer>
  );
}
