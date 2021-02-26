import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleArchived, selectCall } from "../redux/modules/calls";
import api from "../lib/api";

export default function useCall(callId = null) {
  const dispatch = useDispatch();
  const [call, setCall] = useState(null);
  const storeCall = useSelector(selectCall(callId));

  function fetchCall() {
    return api.get(`/calls/${callId}`);
  }

  async function getCall() {
    try {
      const _call = storeCall || (await fetchCall());
      setCall(_call);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (callId) {
      getCall();
    }
  }, []);

  return {
    call,
    toggleArchived: (callId, isArchived) =>
      dispatch(toggleArchived(callId, isArchived)),
  };
}
