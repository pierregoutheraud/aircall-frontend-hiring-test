import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Call from "../../components/Call/Call";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import Loading from "../../components/Loading/Loading";
import useCalls from "../../hooks/useCalls";
import useCall from "../../hooks/useCall";
import styles from "./Home.module.css";

export default function Home() {
  const history = useHistory();
  const page = parseInt(useParams().page || 1);

  const { calls, totalCount, limit, loading } = useCalls(page);
  const { toggleArchived } = useCall();

  function goToPage(newPage) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push(`/${Math.max(newPage, 1)}`);
  }

  const _calls = calls.map(call => {
    return (
      <Call
        key={call.id}
        className={styles.call}
        call={call}
        onChangeArchived={toggleArchived}
        hasCheckbox
        isClickable
      />
    );
  });

  return (
    <main className={styles.container}>
      {loading ? <Loading className={styles.loading} /> : null}
      <div className={styles.calls}>{_calls}</div>
      <PaginationNav
        className={styles.nav}
        page={page}
        maxPage={Math.ceil(totalCount / limit)}
        onPage={goToPage}
        disabled={loading}
      />
    </main>
  );
}
