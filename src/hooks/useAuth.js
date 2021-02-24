import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/modules/auth";

export default function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, accessToken } = useSelector(
    state => state.auth
  );

  return {
    isAuthenticated,
    user,
    accessToken,
    login: (...credentials) => dispatch(login(...credentials)),
  };
}
