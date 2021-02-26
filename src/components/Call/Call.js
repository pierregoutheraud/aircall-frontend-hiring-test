import React from "react";
import cx from "classnames";
import {
  Icon,
  InboundOutlined,
  OutboundOutlined,
  Typography,
  Checkbox,
  ArchiveOutlined,
  VoicemailOutlined,
  CloseOutlined,
  CallOutlined,
  IconButton,
} from "@aircall/tractor";
import { useHistory } from "react-router-dom";
import { toHHMMSS } from "../../lib/utils";
import styles from "./Call.module.css";

const DIRECTIONS = {
  INBOUND: "inbound",
  OUTBOUND: "outbound",
};

const CALL_TYPES = {
  MISSED: "missed",
  ANSWERED: "answered",
  VOICEMAIL: "voicemail",
};

export default function Call({
  call,
  className,
  isClickable = false,
  hasCheckbox = false,
  hasVia = false,
  hasNotes = false,
  onChangeArchived = () => {},
}) {
  const history = useHistory();
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
  const createdAtDate = new Date(createdAt);

  function handleClick() {
    history.push(`/call/${id}`);
  }

  function handleClickArchive(e) {
    e.stopPropagation();
    onChangeArchived(!isArchived);
  }

  function getTypeIcon() {
    switch (callType) {
      case CALL_TYPES.MISSED:
        return CloseOutlined;
      case CALL_TYPES.ANSWERED:
        return CallOutlined;
      case CALL_TYPES.VOICEMAIL:
        return VoicemailOutlined;
      default:
        return CallOutlined;
    }
  }

  function getDirectionIcon() {
    switch (direction) {
      case DIRECTIONS.INBOUND:
        return InboundOutlined;
      case DIRECTIONS.OUTBOUND:
        return OutboundOutlined;
      default:
        return InboundOutlined;
    }
  }

  function renderNotes() {
    if (!hasNotes || !notes.length) {
      return null;
    }

    const _notes = notes.map(({ id, content }) => {
      return (
        <div className={styles.note} key={id}>
          <Typography className={cx(styles.textSmall)} variant="subheading1">
            {content}
          </Typography>
        </div>
      );
    });

    return <div className={styles.notes}>{_notes}</div>;
  }

  function renderPhones() {
    return [
      { label: "From", value: from },
      { label: "To", value: to },
      ...(hasVia ? [{ label: "Via", value: via }] : []),
    ].map(({ label, value }) => {
      return (
        <div className={styles.phones} key={label}>
          <Typography className={styles.directionText} variant="displayS2">
            {label}
          </Typography>
          <Typography variant="displayS">{value}</Typography>
        </div>
      );
    });
  }

  return (
    <div
      className={cx(
        styles.container,
        isClickable && styles.isClickable,
        className
      )}
      onClick={isClickable ? handleClick : undefined}
    >
      <div className={styles.columns}>
        {hasCheckbox && (
          <div className={styles.column}>
            <Checkbox
              onChange={e => console.log(e)}
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
        <div className={cx(styles.column, styles.columnRow)}>
          <Icon
            className={styles.direction}
            component={getDirectionIcon()}
            color={callType === CALL_TYPES.MISSED ? "red.base" : "primary.base"}
            size={40}
          />
          <Icon
            className={styles.direction}
            component={getTypeIcon()}
            color={callType === CALL_TYPES.MISSED ? "red.base" : "primary.base"}
            size={32}
          />
        </div>
        <div className={styles.column}>{renderPhones()}</div>
        <div className={styles.column}>
          <Typography
            className={cx(styles.textSmall, styles.textBorder)}
            variant="subheading1"
          >
            {toHHMMSS(duration / 1000)}
          </Typography>
        </div>
        <div className={styles.column}>
          <Typography className={styles.textSmall} variant="subheading1">
            {createdAtDate.toLocaleTimeString()}
          </Typography>
          <Typography className={styles.textSmall} variant="subheading1">
            {createdAtDate.toLocaleDateString()}
          </Typography>
        </div>

        <div className={styles.column}>
          <IconButton
            onClick={handleClickArchive}
            size={32}
            component={ArchiveOutlined}
            color={isArchived ? "red.base" : "grey.light"}
          />
        </div>
      </div>
      {renderNotes()}
    </div>
  );
}
