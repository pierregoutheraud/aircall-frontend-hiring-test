import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listenToCallsUpdates,
  toggleArchived,
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
  }, []);

  return {
    call,
    toggleArchived: (callId, isArchived) =>
      dispatch(toggleArchived(callId, isArchived)),
  };
}
