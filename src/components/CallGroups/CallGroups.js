import React from "react";
import PropTypes from "prop-types";
import CallGroup from "../CallGroup/CallGroup";

CallGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default function CallGroups({ children }) {
  let day = null;
  const groups = React.Children.toArray(children)
    .reduce((acc, call) => {
      const currentDay = new Date(call.props.created_at).toLocaleDateString();
      if (currentDay !== day) {
        acc.push([]);
      }
      day = currentDay;
      acc[acc.length - 1].push(call);
      return acc;
    }, [])
    .map(group => {
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
        <CallGroup key={day} label={label}>
          {group}
        </CallGroup>
      );
    });

  return groups;
}
