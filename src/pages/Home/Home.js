import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Call from "../../components/Call/Call";
import PaginationNav from "../../components/PaginationNav/PaginationNav";
import Loading from "../../components/Loading/Loading";
import useCalls from "../../hooks/useCalls";
import styles from "./Home.module.css";

export default function Home() {
  const history = useHistory();
  const page = parseInt(useParams().page || 1);

  const { list, totalCount, limit, loading } = useCalls(page);

  function goToPage(newPage) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push(`/${Math.max(newPage, 1)}`);
  }

  function handleChangeArchived(archived) {
    console.log(archived);
  }

  const _list = list.map(call => {
    return (
      <Call
        key={call.id}
        className={styles.call}
        call={call}
        isClickable
        onChangeArchived={handleChangeArchived}
      />
    );
  });

  return (
    <main className={styles.container}>
      {loading ? <Loading className={styles.loading} /> : null}
      <div className={styles.calls}>{_list}</div>
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
