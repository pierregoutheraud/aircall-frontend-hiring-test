import React from "react";
import PropTypes from "prop-types";
import CallGroup from "../CallGroup/CallGroup";
import { groupSortedArrayIntoArraysBy } from "../../lib/utils";

CallGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default function CallGroups({ children }) {
  const getComparator = call =>
    new Date(call.props.created_at).toLocaleDateString();
  const groups = groupSortedArrayIntoArraysBy(
    React.Children.toArray(children),
    getComparator
  ).map(group => {
    const day = group[0].props.created_at;
    const date = new Date(day);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const label = date.toLocaleDateString("en-US", options);
    return (
      <CallGroup key={day} label={label} role="listbox">
        {group}
      </CallGroup>
    );
  });

  return groups;
}
