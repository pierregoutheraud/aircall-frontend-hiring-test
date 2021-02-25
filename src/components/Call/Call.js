import React, { useEffect } from "react";
import cx from "classnames";
import {
  Icon,
  InboundOutlined,
  OutboundOutlined,
  Typography,
  Checkbox,
} from "@aircall/tractor";
import styles from "./Call.module.css";

const DIRECTIONS = {
  INBOUND: "inbound",
  OUTBOUND: "outbound",
};

const CALL_TYPES = {
  MISSED: "missed",
  ANSWERED: "answered",
};

var toHHMMSS = secs => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export default function Call({ call, className }) {
  const {
    id,
    duration,
    is_archived: isArchived,
    from,
    to,
    direction,
    call_type: callType,
    via,
    created_at: createdAt,
    notes,
  } = call;

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.column}>
        <Checkbox />
      </div>

      <div className={styles.column}>
        <Icon
          className={styles.direction}
          component={
            direction === DIRECTIONS.INBOUND
              ? InboundOutlined
              : OutboundOutlined
          }
          color={callType === CALL_TYPES.MISSED ? "red.base" : "primary.base"}
          size={40}
        />
      </div>
      <div className={cx(styles.column, styles.fromTo)}>
        <div>
          <Typography className={styles.directionText} variant="displayS2">
            From
          </Typography>
          <Typography variant="displayS">{from}</Typography>
        </div>
        <div>
          <Typography className={styles.directionText} variant="displayS2">
            to
          </Typography>
          <Typography variant="displayS" fontFamily="arial">
            {to}
          </Typography>
        </div>
      </div>
      <div className={cx(styles.column, styles.duration)}>
        <Typography
          className={cx(styles.textSmall, styles.textBorder)}
          variant="subheading1"
        >
          {toHHMMSS(duration / 1000)}
        </Typography>
      </div>

      <div className={cx(styles.column, styles.createdAt)}>
        <Typography className={styles.textSmall} variant="subheading1">
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </div>
    </div>
  );
}
