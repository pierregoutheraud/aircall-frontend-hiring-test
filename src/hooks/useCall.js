import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../lib/api";

export default function useCall(callId = null) {
  const [call, setCall] = useState(null);

  async function fetchCall() {
    const call = await api.get(`/calls/${callId}`);
    setCall(call);
  }

  useEffect(() => {
    fetchCall();
  }, []);

  return call;
}
