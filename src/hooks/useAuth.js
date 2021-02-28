import { useDispatch, useSelector } from "react-redux";
import { checkAuth, login } from "../redux/modules/auth";

export default function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, accessToken } = useSelector(
    state => state.auth
  );

  return {
    isAuthenticated,
    user,
    accessToken,
    checkAuth: () => dispatch(checkAuth()),
    login: (...credentials) => dispatch(login(...credentials)),
  };
}
