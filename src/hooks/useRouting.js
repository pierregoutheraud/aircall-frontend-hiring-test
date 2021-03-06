import { useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

export const PAGES = {
  HOME: "HOME",
  CALL: "CALL",
};

export default function useRouting() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  let { prevPath } = location.state || { prevPath: "/" };

  const goTo = useCallback(
    (page, params) => {
      function push(pathname) {
        const prevPath = history.location.pathname;
        history.push({
          pathname,
          state: { prevPath },
        });
      }

      switch (page) {
        case PAGES.HOME:
          const page = params.page || 1;
          return push(`/${page}`);
        case PAGES.CALL:
          if (!params.id) {
            throw new Error("No call id");
          }
          return push(`/call/${params.id}`);
        default:
          return;
      }
    },
    [history]
  );

  return {
    history,
    location,
    params,
    goTo,
    prevPath,
  };
}
