import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToCalls,
  displayPrevPage,
  displayNextPage,
  setLimit,
  selectList,
} from "../redux/modules/calls";

export default function useCalls() {
  const dispatch = useDispatch();
  const { totalCount, offset, limit } = useSelector(state => state.calls);
  const list = useSelector(selectList);

  useEffect(() => {
    dispatch(listenToCalls());
  }, []);

  return {
    list,
    totalCount,
    offset,
    limit,
    setLimit: limit => dispatch(setLimit(limit)),
    displayPrevPage: () => dispatch(displayPrevPage()),
    displayNextPage: () => dispatch(displayNextPage()),
  };
}
