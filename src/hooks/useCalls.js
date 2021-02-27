import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToCallsUpdates,
  displayPageByNumber,
  selectCalls,
  archiveCalls,
  unarchiveCalls,
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
    archiveCalls: callsIds => dispatch(archiveCalls(callsIds)),
    unarchiveCalls: callsIds => dispatch(unarchiveCalls(callsIds)),
  };
}
