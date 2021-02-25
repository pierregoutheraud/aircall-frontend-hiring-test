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

  const { list, totalCount, offset, limit, loading } = useCalls(page);

  function goToPage(newPage) {
    history.push(`/${Math.max(newPage, 1)}`);
  }

  const _list = list.map(call => {
    return <Call key={call.id} className={styles.call} call={call} />;
  });

  return (
    <main className={styles.container}>
      <div className={styles.calls}>
        {loading ? <Loading /> : null}
        {_list}
      </div>
      <PaginationNav
        page={page}
        maxPage={Math.ceil(totalCount / limit)}
        onPage={goToPage}
        disabled={loading}
      />
    </main>
  );
}
