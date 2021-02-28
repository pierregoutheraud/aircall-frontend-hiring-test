import { useEffect, useState, useCallback } from "react";
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
  const [callsIdsChecked, setCallsIdsChecked] = useState([]);
  const calls = useSelector(selectCalls);

  useEffect(() => {
    dispatch(listenToCallsUpdates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(displayPageByNumber(page));
  }, [page, dispatch]);

  // I memoized this function so that component using it as a prop, get the same reference and do not get re-rendered everytime.
  // It is useful for Call component for example since it is using React.memo.
  const checkCall = useCallback((callId, checked) => {
    if (checked) {
      setCallsIdsChecked(callsIdsChecked => [...callsIdsChecked, callId]);
    } else {
      setCallsIdsChecked(callsIdsChecked =>
        callsIdsChecked.filter(id => id !== callId)
      );
    }
  }, []);

  return {
    calls,
    totalCount,
    offset,
    limit,
    loading,
    callsIdsChecked,
    setCallsIdsChecked,
    checkCall,
    archiveCalls: callsIds => dispatch(archiveCalls(callsIds)),
    unarchiveCalls: callsIds => dispatch(unarchiveCalls(callsIds)),
  };
}
