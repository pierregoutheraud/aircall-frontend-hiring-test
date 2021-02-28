import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listenToCallsUpdates,
  toggleIsArchived,
  selectCall,
  fetchCall,
} from "../redux/modules/calls";

export default function useCall(callId = null) {
  const dispatch = useDispatch();
  const call = useSelector(selectCall(callId));

  useEffect(() => {
    dispatch(listenToCallsUpdates());

    if (callId && !call) {
      dispatch(fetchCall(callId));
    }
  }, [call, callId, dispatch]);

  return {
    call,
    toggleIsArchived: useCallback(
      callId => dispatch(toggleIsArchived(callId)),
      [dispatch]
    ),
  };
}
