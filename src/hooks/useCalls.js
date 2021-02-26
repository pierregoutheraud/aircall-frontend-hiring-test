import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToCallsUpdates,
  displayPageByNumber,
  displayPrevPage,
  displayNextPage,
  setLimit,
  selectCalls,
} from "../redux/modules/calls";

export default function useCalls(page = 1) {
  const dispatch = useDispatch();
  const { totalCount, offset, limit, loading } = useSelector(
    state => state.calls
  );
  const calls = useSelector(selectCalls);

  useEffect(() => {
    dispatch(listenToCallsUpdates());
  }, []);

  useEffect(() => {
    dispatch(displayPageByNumber(page));
  }, [page]);

  return {
    calls,
    totalCount,
    offset,
    limit,
    loading,
    setLimit: limit => dispatch(setLimit(limit)),
    displayPrevPage: () => dispatch(displayPrevPage()),
    displayNextPage: () => dispatch(displayNextPage()),
  };
}
